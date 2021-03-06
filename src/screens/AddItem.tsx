import MainWrapper from "../components/MainWrapper";
import { useState } from "react";
import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Field, Form, useFormik, FormikProps, FormikProvider } from "formik";
import * as Yup from "yup";
import { react } from "@babel/types";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { History } from "history";
import ProductService from "./ProductService";

interface Values {
  ID: number;
  TypeID: string;
  Name: string;
  Quantity: number;
  Price: number;
  Description: string;
}

interface InitialValuesType {
  id: number;
  typeId: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
}

interface MatchParams {
  id: string;
}

export const AddItem = () => {
  let { id } = useParams<MatchParams>();
  useEffect(() => {
    console.log("MatchParams", id);
  });
  const productService = new ProductService();
  const history = useHistory();

  const [initialValues, setInitialValues] = useState<InitialValuesType>({
    id: 0,
    typeId: "",
    name: "",
    quantity: 0,
    price: 0,
    description: "",
  });
  useEffect(() => {
    if (id) {
      fetchDevice();
    }
  }, []);

  const fetchDevice = async () => {
    axios.get(`http://localhost:3000/products/${id}`).then((res) => {
      setInitialValues({
        id: res.data.id,
        typeId: res.data.typeId,
        name: res.data.name,
        quantity: res.data.quantity,
        price: res.data.price,
        description: res.data.description,
      });
    });
  };
  const formik: FormikProps<any> = useFormik({
    enableReinitialize: true,
    validateOnBlur: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      id: Yup.string()
        .min(1, "Too Short!")
        .max(10, "Too Long!")
        .required("Required"),
      typeId: Yup.string()
        .min(1, "Too Short!")
        .max(10, "Too Long!")
        .required("Required"),
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      quantity: Yup.string()
        .min(1, "Too Short!")
        .max(6, "Too Long!")
        .required("Required"),
      price: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      description: Yup.string()
        .min(2, "Too Short!")
        .max(1000, "Too Long!")
        .required("Required"),
    }),
    onSubmit: (data) => {
      if (id) {
        productService
          .updateProduct(id, data)
          .then((response: any) => {
            productService.successMessage("Uspje??no ste uredili proizvod! ");
            history.goBack();
          })
          .catch((error) => {
            productService.failMessage(error.message);
            history.goBack();
          });
      } else {
        productService
          .postProduct({
            id: data.id,
            typeId: data.typeId,
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            description: data.description,
          })
          .then((response: any) => {
            productService.successMessage("Uspje??no ste dodali proizvod!");
            history.goBack();
          })
          .catch((error) => {
            productService.failMessage(error.message);
            history.goBack();
          });
      }
    },
  });

  return (
    <MainWrapper>
      <div className="page__header">
        <h2 className="page__headline ml-4">Add/Edit a product</h2>
        <div className="page__action">
          <Link to="/products">
            <i className="icon icon--return icon--lg2 mr-4"></i>
          </Link>
        </div>
      </div>
      <FormikProvider value={formik}>
        <div className="card ml-4">
          <Form id="deviceForm" className="field">
            <div className="field">
              <label className="field__label" htmlFor="ID">
                ID
              </label>
              <Field
                className="input input--base input--text"
                name="id"
                type="number"
                placeholder="Product's ID..."
              />
              {formik.errors.id && formik.touched.id ? (
                <div className="field__validation">{formik.errors.id}</div>
              ) : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="typeid">
                TypeID
              </label>
              <Field
                className="input input--base input--text"
                name="typeId"
                type="text"
                placeholder="Product's type ID..."
              />

              {formik.errors.typeId && formik.touched.typeId ? (
                <div className="field__validation">{formik.errors.typeId}</div>
              ) : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="name">
                Name
              </label>

              <Field
                className="input input--base input--text"
                name="name"
                type="text"
                placeholder="Name of product..."
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="field__validation">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="quantity">
                Quantity
              </label>
              <Field
                className="input input--base input--text"
                name="quantity"
                type="number"
                placeholder="Quantity of product..."
              />

              {formik.errors.quantity && formik.touched.quantity ? (
                <div className="field__validation">
                  {formik.errors.quantity}
                </div>
              ) : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="price">
                Price
              </label>
              <Field
                className="input input--base input--text"
                name="price"
                type="number"
                placeholder="Product's price..."
              />

              {formik.errors.price && formik.touched.price ? (
                <div className="field__validation">{formik.errors.price}</div>
              ) : null}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="price">
                Description
              </label>
              <Field
                className="input input--base input--text"
                name="description"
                type="text"
                placeholder="Describe the product..."
              />

              {formik.errors.description && formik.touched.description ? (
                <div className="field__validation">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            <div>
              <button
                form="deviceForm"
                className="btn btn--primary ml-3"
                type="submit"
              >
                Submit
              </button>
              <button
                className="btn btn--secondary"
                type="button"
                onClick={() => history.goBack()}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </FormikProvider>
    </MainWrapper>
  );
};

export default AddItem;
