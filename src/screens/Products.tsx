import MainWrapper from "../components/MainWrapper";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import _ from "lodash";
import list from "../list.json";
import axios from "axios";
import "react-dropdown/style.css";

interface Props {}

interface SortingType {
  columnName: string;
  sortDirection: string;
}

interface DataType {
  id: number;
  typeId: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
}

const TableConfig = [
  { id: "name", name: "Name" },
  { id: "quantity", name: "Quantity" },
  { id: "price", name: "Price" },
  { id: "description", name: "Description" },
  { id: "actions", name: "Actions" },
];

const Products = (props: Props) => {
  let SortType: SortingType = { columnName: "name", sortDirection: "dsc" };
  const [ModalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [activeSorting, setActiveSorting] = useState<SortingType>(SortType);
  const [filterText, setFilterText] = useState("");
  const [removeProduct, setRemoveProduct] = useState(list);
  const [itemsToRender, setItemsToRender] = useState<DataType[]>(list.products);

  useEffect(() => {
    SortedProducts();
  }, [activeSorting]);

  useEffect(() => {
    filter();
  }, [filterText]);

  const SortedProducts = () => {
    let SortingTable =
      activeSorting.sortDirection === "asc"
        ? _.orderBy(list.products, [activeSorting.columnName], ["asc"])
        : _.orderBy(list.products, [activeSorting.columnName], ["desc"]);
    setItemsToRender(SortingTable);
  };

  const handleModal = () => {
    // setModalIsOpen(!ModalIsOpen);
  };

  const handleSorting = (columnName: string, sortDirection: string) => {
    setActiveSorting({ columnName, sortDirection });
  };

  const filter = () => {
    if (filterText.length > 2) {
      setItemsToRender(
        list.products.filter((item) =>
          item.name.toLocaleLowerCase().includes(filterText)
        )
      );
    } else {
      SortedProducts();
    }
  };

  const testToastify = () => {
    toast.error(`ERROR`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleRemoveProduct = (id: number, name: string) => {
    /*let currentObject = list.products.find((item) => item.id === id);
    if (currentObject) {
      let index = list.products.indexOf(currentObject);
      list.products.splice(index, 1);
      */
    console.log(id);
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
        toast.success(`Proizvod "${name}" je uspješno obrisan!`, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const DropdownSelection = (id: string) => {
    console.log(id);
    setItemsToRender(list.products.filter((item) => item.typeId.includes(id)));
  };

  /*
  axios
    .post("http://localhost:3000/products", {
      id: 12,
      typeId: 3,
      name: "Vivax",
      quantity: 15,
      price: 1425,
      description: "Some description...",
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
*/
  return (
    <MainWrapper>
      <div>
        <div className="page__header">
          <div className="page__headline">
            <h2>Products</h2>
          </div>
          <Link to="products/add">
            <i className="icon icon--add icon--lg2"></i>
          </Link>
        </div>
        <div className="page__actions">
          <div className="input">
            <i className="input--searchIcon"></i>
            <input
              className="input__search ml-2"
              type="text"
              name="searchbar"
              placeholder="Search products..."
              value={filterText}
              onChange={(e) =>
                setFilterText(e.target.value.toLocaleLowerCase())
              }
            />
            {!itemsToRender.length && (
              <div className="input__warning">There are no such products!</div>
            )}
          </div>
          <div className="dropdown">
            <button
              className="dropdown__button mr-3"
              onClick={() => SortedProducts()}
            >
              Devices:
            </button>
            <div className="dropdown__content">
              {list.types.map((item) => (
                <a className="mr-3" onClick={() => DropdownSelection(item.id)}>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="page__content">
          <table className="table">
            <thead>
              <tr>
                {TableConfig.map((item) => {
                  return (
                    <th
                      key={item.id}
                      onClick={() =>
                        handleSorting(
                          item.id,
                          activeSorting.columnName !== item.id
                            ? "dsc"
                            : activeSorting.sortDirection === "asc"
                            ? "dsc"
                            : "asc"
                        )
                      }
                    >
                      <div className="table__head__item">
                        {item.name}{" "}
                        {activeSorting.columnName === item.id ? (
                          activeSorting.sortDirection === "asc" ? (
                            <i className="icon icon--asc" />
                          ) : (
                            <i className="icon icon--dsc" />
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {itemsToRender.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <Link to={`products/${item.id}`}>
                      <i className="icon icon--edit" />
                    </Link>
                    <i
                      onClick={() => {
                        handleRemoveProduct(item.id, item.name);
                        SortedProducts();
                      }}
                      className="ml-3 icon icon--lg1 icon--delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </div>
      {ModalIsOpen ? (
        <div className={`modal`}>
          <div className="modal__headline">Are you sure?</div>

          <div className="modal__button">
            <button className="btn btn--primary" onClick={() => handleModal()}>
              Yes
            </button>
            <button
              className="btn btn--secondary"
              onClick={() => handleModal()}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </MainWrapper>
  );
};

export default Products;
