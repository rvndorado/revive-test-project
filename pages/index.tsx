import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination, Loader } from "semantic-ui-react";
import Layout from "../presentationals/layout";
import { useStore } from "../stores/userStore";
import { User } from "../common/types";
import UserTable from "../components/UserTable";

const Home: NextPage = () => {
  const { fetchData, users, currentPage, user_count, setCurrentPage } =
    useStore();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchUsers(currentPage);
    }, 2000);
  }, []);

  const fetchUsers = async (pageNumber: number) => {
    try {
      const fetchResponse = await axios.get("/api/users", {
        params: { page: pageNumber },
      });
      const fetchedUsers: User[] = fetchResponse.data.users;
      const userCount: number = fetchResponse.data.totalCount.count;
      fetchData(fetchedUsers, userCount);
    } catch {
      Swal.fire(
        "Something went wrong",
        "An error occured has occured while fetching data",
        "error"
      );
    }
    setLoading(false);
  };

  const fetchFromExternal = async () => {
    try {
      await axios.post("/api/users/fetch");
      setLoading(true);
      setTimeout(() => {
        fetchUsers(currentPage);
      }, 2000);
    } catch {
      Swal.fire(
        "Something went wrong",
        "An error occured has occured while fetching data",
        "error"
      );
    }
  };

  return (
    <>
      <Head>
        <title>Revive Test Project</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        {loading ? (
          <Loader
            active
            inline="centered"
            size="big"
            content="Fetching User List..."
          />
        ) : (
          <>
            {users.length > 0 ? (
              <>
                <UserTable />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Pagination
                    totalPages={Math.ceil(user_count / 3)}
                    activePage={currentPage}
                    onPageChange={(event, data) => {
                      //@ts-ignore
                      fetchUsers(parseInt(data.activePage));
                      //@ts-ignore
                      setCurrentPage(data.activePage);
                    }}
                  />
                </div>
              </>
            ) : (
              <h3>
                Data fetched is empty, Click{" "}
                <a href="javascript:void(0);" onClick={fetchFromExternal}>
                  here
                </a>{" "}
                to fetch from external API.
              </h3>
            )}
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
