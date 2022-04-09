import { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Swal from "sweetalert2";
import Layout from "../presentationals/layout";
import { useStore } from "../stores/userStore";
import { User } from "../common/types";
import UserTable from "../components/UserTable";

const Home: NextPage = () => {
  const { fetchData } = useStore();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchResponse = await axios.get("/api/users");
      const fetchedUsers: User[] = fetchResponse.data;
      fetchData(fetchedUsers);
    } catch {
      Swal.fire(
        "Something went wrong",
        "An error occured has occured while fetching data",
        "error"
      );
    }
  };

  const handleView = (id: string) => alert(id);

  return (
    <>
      <Layout>
        <UserTable />
      </Layout>
    </>
  );
};

export default Home;
