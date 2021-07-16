import MainWrapper from "../components/MainWrapper";

import { useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

interface Props {}



const Products = (props: Props) => {
    const list = [
        {
          id:1,  
          typeid: 1,
          name: 'Samsung Galaxy S21',
          quantity: 4,
          price: 999.99,
          description: 'Some description...',
        },
        {
          id:2,  
          typeid: 2,
          name: 'Xiaomi Redmi 6A',
          quantity: 5,
          price: 999.99,
          description: 'Some description...',
        },
        {
            id:3,
            typeid: 3,
            name: 'Samsung Galaxy S21',
            quantity: 4,
            price: 999.99,
            description: 'Some description...',
          },
          {
            id:4,  
            typeid: 4,
            name: 'Samsung Galaxy S21',
            quantity: 4,
            price: 999.99,
            description: 'Some description...',
          },
          {
            id:5,  
            typeid: 5,
            name: 'Samsung Galaxy S21',
            quantity: 4,
            price: 999.99,
            description: 'Some description...',
          }
      ];

      const [ModalIsOpen,setModalIsOpen] = useState <boolean>(false);
      const handleModal=() =>{
          setModalIsOpen(!ModalIsOpen);
      }

      const handleSorting=()=>{
        
       let orderedList= _.orderBy(list, ['name'], ['desc']);
       console.log("order list",orderedList)
      }
     
    return(
        <MainWrapper>

            <div>
                <div className="page__header">
                    <div className="page__headline">
                        <h2>Products</h2>
                    </div>
                    <Link to="products/add">
                    <i className="icon icon--add icon--lg"
                            ></i>
                    </Link>   
                </div>
                
                    <div className="input">
                        <i className="input--searchIcon"></i>
                        <input className="input__search" 
                            type="text"
                            name="searchbar"  
                            placeholder="Search products..."
                        />
                         
                    </div>


               

                <div className="page__content">
                    <table className="table">
                        <thead>
                            <tr>
                                <th >ID</th>
                                <th>TypeID</th>
                                <th>
                                 <i className="icon icon--search" onClick={()=>handleSorting()}> 
                                 </i>   Name</th>
                                
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            list.map((item) => (
                                <tr key={item.id}>

                                    <td>{item.id}</td>
                                    <td>{item.typeid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                
                                    <td>
                                        <Link to={`products/${item.id}`}>
                                        <i  className="icon icon--edit"/>
                                        </Link>
                                        </td>
                                    
                                    <td><i onClick={()=>handleModal()} className="icon icon--delete"/></td>
                                    
                                    
                                </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                </div>

            </div>
            {
                ModalIsOpen 
                ? <div className={`modal`}>
                   
                       <div className="modal__headline">
                           
                           Are you sure?
                       </div>

                <button className="modal--btn-primary" onClick={() => handleModal()}>Yes</button>
                <button className="modal--btn-secondary" onClick={() => handleModal()}>No</button>

                  </div>
   
                : <></>
            }
            
        </MainWrapper>
    )
}

export default Products;