import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Pagination from "@mui/material/Pagination";
import PrivateProvider from "../providers/PrivateProvider";
import TableTitle from "../components/TableTitle";
import SilverBox from "../components/SilverBox";
import DashboardMenu from "../components/DashboardMenu";
import CarsMenu from "../components/CarsMenu";
import TopNavbar from "../components/TopNavbar";
import WhiteNavbar from "../components/WhiteNavbar";
import PaginationDropdown from "../components/PaginationDropdown";
import CarTable from "../components/CarTable";
import type { CarData } from "../components/CarTable";
import OrderTable from "../components/OrderTable";
import type { OrderData } from "../components/OrderTable";
import CircularProgress from "@mui/material/CircularProgress";
import { API_PRODUCTION } from "../data/API";

// API
const orderDataAPI = `${API_PRODUCTION}/api/orders/`;
const carDataAPI = `${API_PRODUCTION}/api/cars/`;

const Dashboard = () => {
  // Raw Data
  const [orderRawData, setOrderRawData] = useState<OrderData[]>([]);
  const [carRawData, setCarRawData] = useState<CarData[]>([]);

  // Data
  const [orderData, setOrderData] = useState<OrderData[]>([]);
  const [carData, setCarData] = useState<CarData[]>([]);

  // Data Length
  const [orderDataLength, setOrderDataLength] = useState<number>(0);
  const [carDataLength, setCarDataLength] = useState<number>(0);

  // Current Page
  const [orderPage, setOrderPage] = useState<number>(1);
  const [carPage, setCarPage] = useState<number>(1);

  // Total Page
  const [orderTotalPage, setOrderTotalPage] = useState<number>(0);
  const [carTotalPage, setCarTotalPage] = useState<number>(0);

  // Number Data Per Page
  const [limitOrderData, setLimitOrderData] = useState<number>(10);
  const [limitCarData, setLimitCarData] = useState<number>(10);

  // Fetching Data state
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [loadingCar, setLoadingCar] = useState(true);

  // Render Data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(orderDataAPI, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data.data;
        const dataLength = data.length;
        setOrderRawData(data);
        setOrderTotalPage(Math.ceil(dataLength / limitOrderData));
        setOrderData(data.slice(0, limitOrderData));
        setOrderDataLength(dataLength);
        setLoadingOrder(false);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCar = async () => {
      try {
        const response = await axios.get(carDataAPI, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data.data;
        const dataLength = data.length;
        setCarRawData(data);
        setCarTotalPage(Math.ceil(dataLength / limitOrderData));
        setCarData(data.slice(0, limitOrderData));
        setCarDataLength(dataLength);
        setLoadingCar(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
    fetchCar();
  }, []);

  // Change Data function
  const changeOrderData = (page: number) => {
    setOrderPage(page);
    const startIndex = (page - 1) * limitOrderData;
    const endIndex = page * limitOrderData;
    const newOrderData = orderRawData.slice(startIndex, endIndex);
    setOrderData(newOrderData);
  };

  const changeCarData = (page: number) => {
    setCarPage(page);
    const startIndex = (page - 1) * limitCarData;
    const endIndex = page * limitCarData;
    setCarData(carRawData.slice(startIndex, endIndex));
  };

  const handleOrderChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event);
    changeOrderData(page);
    setOrderPage(page);
  };

  const handleCarChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    changeCarData(page);
    setCarPage(page);
  };

  return (
    <PrivateProvider>
      <div className="flex min-h-screen w-screen bg-white">
        {/* <!-- Blue Sidebar --> */}
        <section
          id="blue-sidebar"
          className="h-screen bg-[#0d28a6] w-[4.5rem] flex flex-col items-center py-2"
        >
          {/* <!-- silver box --> */}
          <SilverBox />

          {/* <!-- Dashboard Menu --> */}
          <DashboardMenu active={true} />

          {/* <!-- Cars --> */}
          <CarsMenu active={false} />
        </section>

        {/* <!-- Right Content --> */}
        <section
          id="right-section"
          className="grow flex flex-col h-screen overflow-y-auto"
        >
          {/* <!-- Top Navbar --> */}
          <TopNavbar />

          <div className="flex grow">
            {/* <!-- White Navbar --> */}
            <WhiteNavbar title1="DASHBOARD" title2="Dashboard" />

            {/* <!-- Main Content --> */}
            <section
              id="main-content"
              className="grow pt-4 px-4 bg-[#F4F5F7] text-black"
            >
              <div className="w-full">
                {/* <!-- Breadcrumbs --> */}
                <div role="presentation" className="mt-6">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<NavigateNextIcon fontSize="small" />}
                  >
                    <p className="font-extrabold text-black">Dashboard</p>
                    <p className="text-black">Dashboard</p>
                  </Breadcrumbs>
                </div>

                {/* <!-- Title , message, and Button --> */}
                <div className="w-full flex justify-between items-center mt-6">
                  <p className="text-2xl font-bold">Dashboard</p>
                  <div id="messageContainer"></div>
                </div>

                {/* <!-- Table Title --> */}
                <div className="mt-6">
                  <TableTitle title="List Order" />
                </div>

                {/* <!-- Order Table --> */}
                <section className="mt-4">
                  {loadingOrder && (
                    <div className="w-full p-16 flex flex-col justify-center items-center font-bold rounded-xl border-2 bg-[#D2D3D5]">
                      <CircularProgress />
                      <p className="mt-4 text-[#1976d2]">Loading</p>
                    </div>
                  )}
                  {!loadingOrder && orderDataLength === 0 && (
                    <div className="w-full p-16 flex justify-center items-center font-bold rounded-xl border-2 bg-[#D2D3D5]">
                      Data Not Found
                    </div>
                  )}
                  {!loadingOrder && orderDataLength > 0 && (
                    <>
                      <OrderTable data={orderData} />
                      {/* Dropdown pagination section */}
                      <div className="w-full mt-4 flex justify-between">
                        {/* Left Div */}
                        <PaginationDropdown
                          dataLength={orderDataLength}
                          totalPage={orderTotalPage}
                          limitData={limitOrderData}
                          limitChange={setLimitOrderData}
                          setTotalPage={setOrderTotalPage}
                          dataChange={changeOrderData}
                        />
                        {/* Right Div - MUI Pagination*/}
                        <div className="grow flex justify-end items-center">
                          <div className="">
                            <p className="invisible mb-2">dummy</p>
                            <Pagination
                              count={orderTotalPage}
                              variant="outlined"
                              shape="rounded"
                              page={orderPage}
                              onChange={handleOrderChange}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </section>

                {/* <!-- Table Title --> */}
                <div className="mt-8">
                  <TableTitle title="List Car" />
                </div>

                {/* <!-- Car Table --> */}
                <section className="mt-4">
                  {loadingCar && (
                    <div className="w-full p-16 flex flex-col justify-center items-center font-bold rounded-xl border-2 bg-[#D2D3D5]">
                      <CircularProgress />
                      <p className="mt-4 text-[#1976d2]">Loading</p>
                    </div>
                  )}
                  {!loadingCar && carDataLength === 0 && (
                    <div className="w-full p-16 flex justify-center items-center font-bold rounded-xl border-2 bg-[#D2D3D5]">
                      Data Not Found
                    </div>
                  )}
                  {!loadingCar && carDataLength > 0 && (
                    <>
                      <CarTable data={carData} />

                      {/* Dropdown pagination section */}
                      <div className="w-full mt-4 flex justify-between">
                        {/* Left Div */}
                        <PaginationDropdown
                          dataLength={carDataLength}
                          totalPage={carTotalPage}
                          limitData={limitCarData}
                          limitChange={setLimitCarData}
                          setTotalPage={setCarTotalPage}
                          dataChange={changeCarData}
                        />
                        {/* Right Div - MUI Pagination*/}
                        <div className="grow flex justify-end items-center">
                          <div className="mb-12">
                            <p className="invisible mb-2">dummy</p>
                            <Pagination
                              count={carTotalPage}
                              variant="outlined"
                              shape="rounded"
                              page={carPage}
                              onChange={handleCarChange}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </section>
              </div>
            </section>
          </div>
        </section>
      </div>
    </PrivateProvider>
  );
};

export default Dashboard;
