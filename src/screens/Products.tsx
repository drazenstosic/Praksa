import MainWrapper from "../components/MainWrapper";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import _ from "lodash";
import ProductService from "./ProductService";

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

interface ProductTypes {
  id: string;
  name: string;
}

const TableConfig = [
  { id: "name", name: "Name" },
  { id: "quantity", name: "Quantity" },
  { id: "price", name: "Price" },
  { id: "description", name: "Description" },
  { id: "actions", name: "Actions" },
];

const Products = (props: Props) => {
  const productService = new ProductService();
  let SortType: SortingType = { columnName: "name", sortDirection: "dsc" };

  const [ModalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [activeSorting, setActiveSorting] = useState<SortingType>(SortType);
  const [filterText, setFilterText] = useState("");
  const [itemsToRender, setItemsToRender] = useState<DataType[]>([]);
  const [productTypes, setProductTypes] = useState<ProductTypes[]>([]);
  const [initialList, setInitialList] = useState<DataType[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [filterText]);

  useEffect(() => {
    SortedProducts();
  }, [activeSorting]);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const SortedProducts = () => {
    let SortingTable =
      activeSorting.sortDirection === "asc"
        ? _.orderBy(itemsToRender, [activeSorting.columnName], ["asc"])
        : _.orderBy(itemsToRender, [activeSorting.columnName], ["desc"]);
    setItemsToRender(SortingTable);
  };

  const handleModal = () => {
    // setModalIsOpen(!ModalIsOpen);
  };

  const handleSorting = (columnName: string, sortDirection: string) => {
    setActiveSorting({ columnName, sortDirection });
  };

  const fetchProducts = () => {
    productService
      .getProducts()
      .then((res) => {
        let data = res.data;
        if (filterText)
          data = res.data.filter((x: any) => {
            var i = x.name.indexOf(filterText);
            return i >= 0;
          });

        setItemsToRender(data);
        setInitialList(data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const removeProduct = (id: number, name: string) => {
    productService
      .deleteProduct(id)
      .then((res) => {
        productService.successMessage(
          `Uspješno ste obrisali proizvod: "${name}" !`
        );
        fetchProducts();
      })
      .catch((error) => {
        productService.failMessage(error.message);
      });
  };

  const fetchProductTypes = () => {
    productService
      .getProductTypes()
      .then((res) => {
        setProductTypes(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const DropdownSelection = (id: string) => {
    console.log(id);
    setItemsToRender(initialList.filter((item) => item.typeId.includes(id)));
  };

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
              onChange={(e) => setFilterText(e.target.value)}
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
              {productTypes.map((item) => (
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
                        removeProduct(item.id, item.name);
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
