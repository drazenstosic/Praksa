import MainWrapper from '../components/MainWrapper';

import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { react } from '@babel/types';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

interface Values {
  ID: string;
  TypeID: string;
  Name: string;
  Quantity: string;
  Price: string;
  Description: string;
}

interface MatchParams{
  id:string;
}



const SignupSchema = Yup.object().shape({
  ID: Yup.string()
    .min(1, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Required'),
  TypeID: Yup.string()
    .min(1, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Required'),
  Name: Yup.string()
    .min(2,'Too short!')
    .max(25,"Too many!")
    .required('Required'),
  Quantity: Yup.string()
    .min(1,'Too low!')
    .max(100,'Too many!')
    .required('Required'),
  Price: Yup.string()
    .min(1,'Too low!')
    .max(10,'Too much!')
    .required('Required'),
  Description: Yup.string()
    .min(10,'Too low!')
    .max(100,'Too much!')
    .required('Required'),
});




export const AddItem = () => {

  let { id } = useParams<MatchParams>();
  useEffect(()=>{
    console.log("MatchParams",id)
  })

  return (

  <MainWrapper>
    
        
      <h2 className="field__headline ml-4">Adding product</h2>
      <Formik
        initialValues={{
          ID:'',
          TypeID:'',
          Name:'',
          Quantity:'',
          Price:'',
          Description:''
        }}
        
        

   
      validationSchema={SignupSchema}
      onSubmit={values => {
        
        console.log(values);
      }}
      >
        {({errors,touched,values}) =>(

       
          
          <div className="card ml-4"> 
                   
          <Form className="field">

          <div className="field"> 
              <label className="field__label" htmlFor="ID">ID</label>
              <Field className="input input--base input--text" name="ID"              
              type="number" 
              id="id" 
                />
              {errors.ID && touched.ID ? (
              <div className="field__validation">{errors.ID}</div>
              ) : null}
           </div>

        
           <div className="field">    
              <label className="field__label" htmlFor="typeid">TypeID</label>
              <Field className="input input--base input--text"

                name="TypeID"                
                type="number"
                id="typeid" 
                />

                {errors.TypeID && touched.TypeID ? (
              <div className="field__validation">{errors.TypeID}</div>
              ) : null}
            </div> 
              

              <div className="field">
              <label className="field__label" htmlFor="name">Name</label>

              <Field className="input input--base input--text"                           
                name="Name"                 
                type="text"
                id="name"
                placeholder="Name of product..." 
              />
                  {errors.Name && touched.Name ? (
              <div className="field__validation">{errors.Name}</div>
              ) : null}

              </div>
                  
              <div className="field">   
              <label className="field__label" htmlFor="quantity">Quantity</label>
              <Field className="input input--base input--text"
                name="Quantity"                
                type="text"
                id="quantity"
                placeholder="Quantity of product..." 
                />

                  {errors.Quantity && touched.Quantity? (
              <div className="field__validation">{errors.Quantity}</div>
              ) : null}

              </div> 



              <div className="field">
              <label className="field__label" htmlFor="price">Price</label>
              <Field className="input input--base input--text"
                name="Price"                 
                type="text"
                id="price"
                placeholder="Product's price..." 
                />

                  {errors.Price && touched.Price ? (
                              <div className="field__validation">{errors.Price}</div>
                ) : null}

              </div>

          
              <div className="field">     
              <label className="field__label" htmlFor="price">Description</label>
              <Field className="input input--base input--text"

                name="Description"                
                type="text" 
                id="description"
                placeholder="Describe the product..." 
                />

                  {errors.Description && touched.Description ? (
              <div className="field__validation">{errors.Description}</div>
                ) : null}

              </div>   

              <div>
              <button className="btn btn--primary ml-3" 
                      type="submit">
                      Submit</button>

              <button className="btn btn--secondary" 
                      type="submit">
                      Cancel</button>
              </div>
        </Form>
        
        </div>
        
        )}

      </Formik>      
    
  </MainWrapper>
  )
                  }
    
  
  


export default AddItem;
