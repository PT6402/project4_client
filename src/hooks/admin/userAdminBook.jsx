import { useState } from "react";
import useHttp from "../auth/useHttp";
import { HttpStatusCode } from "axios";

const useAdminBook = () => {
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const { http } = useHttp();
  const getBookAll = async () => {
    setIsLoading(true);
    try {
      const res = await http.get("api/v1/book/admin/books");
      if (res.status == HttpStatusCode.Ok) {
        return res.data.model;
      }
    } catch (error) {
      setIsError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getPropertiesList = async () => {
    setIsLoading(true);
    try {
      const res = await http.get("api/v1/book/admin/book-properties");
      if (res.status == HttpStatusCode.Ok) {
        return res.data.model;
      }
    } catch (error) {
      setIsError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const createBook = async ({
    authors,
    cates,
    des,
    edition,
    file,
    name,
    price,
    publisher,
  }) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("edition", edition);
      formData.append("publisherDescription", des);
      formData.append("authorlist", authors.join(","));
      formData.append("file", file);
      formData.append("catelist", cates.join(","));
      formData.append("pubId", publisher);

      const res = await http.post("api/v1/book/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == HttpStatusCode.Ok) {
        return res.data;
      }
    } catch (error) {
      setIsError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, isError, getBookAll, getPropertiesList, createBook };
};
export default useAdminBook;
