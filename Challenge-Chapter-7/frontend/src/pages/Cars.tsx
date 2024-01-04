import { useState, useEffect } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PrivateProvider from "../providers/PrivateProvider";
import SilverBox from "../components/SilverBox";
import DashboardMenu from "../components/DashboardMenu";
import CarsMenu from "../components/CarsMenu";
import TopNavbar from "../components/TopNavbar";
import WhiteNavbar from "../components/WhiteNavbar";
import CircularProgress from "@mui/material/CircularProgress";
import { FaRegEdit } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import DeleteButton from "../components/DeleteButton";
import { API_PRODUCTION } from "../data/API";

type CarData = {
  id: number;
  name: string;
  cost: number;
  size: string;
  imageUrl: string;
  available: boolean;
  published: boolean;
  start_rent: string;
  finish_rent: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at: string | null;
};

const API_URL: string = `${API_PRODUCTION}/api/cars`;

const Cars = () => {
  // Pop Up Message
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  // Raw Cars Data
  const [rawCars, setRawCars] = useState<CarData[]>([]);

  // Cars data
  const [cars, setCars] = useState<CarData[]>([]);

  // Loading
  const [loading, setLoading] = useState(true);

  // Fetching Cars Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCars(response.data.data);
        setRawCars(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle Edit Button
  const handleEdit = (id: number) => {
    window.location.href = `/editCar/${id}`;
  };

  // Modals State
  const [open, setOpen] = useState(false);

  // Delete Id
  const [deleteId, setDeleteId] = useState<number>(0);

  // Handle Modals
  const handleOpen = (id: number) => {
    setOpen(true);
    setDeleteId(id);
  };

  // Handle Delete Button
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      window.location.href = "/cars?message=Data%20Berhasil%20Dihapus";
    } catch (error) {
      console.log(error);
    }
  };

  // Category
  const [category, setCategory] = useState("All");

  // Category Handler
  useEffect(() => {
    if (category === "All") {
      setCars(rawCars);
    } else {
      const filteredCars = rawCars.filter((car) => car.size === category);
      setCars(filteredCars);
    }
  }, [category]);

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
          <DashboardMenu active={false} />

          {/* <!-- Cars --> */}
          <CarsMenu active={true} />
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
            <WhiteNavbar title1="CARS" title2="List Car" />

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
                    <p className="font-extrabold text-black">Cars</p>
                    <p className="text-black">List Car</p>
                  </Breadcrumbs>
                </div>

                {/* <!-- Title , message, and Button --> */}
                <div className="w-full flex justify-between items-center mt-6">
                  <p className="text-2xl font-bold w-1/3">List Cars</p>
                  <div id="messageContainer" className="w-1/3">
                    {" "}
                    {message && (
                      <div
                        className={`text-white px-16 py-3 border-none rounded-sm text-center ${
                          message == "Data Berhasil Disimpan" ||
                          message == "Data Berhasil Diupdate"
                            ? "bg-[#73CA5C]"
                            : "bg-[#000000]"
                        }`}
                      >
                        {message}
                      </div>
                    )}
                  </div>
                  <a href="/addCar" className="w-1/3 flex justify-end">
                    <button className="bg-[#0d28a6] px-3 py-1 text-white rounded-none">
                      + Add New Car
                    </button>
                  </a>
                </div>

                {/* Category Button */}
                <div className="w-full flex flex-row mt-6">
                  <button
                    className={`py-2 px-4 border-2 ${
                      category == "All"
                        ? "bg-[#CFD4ED] text-[#0D28A6] border-[#0D28A6]"
                        : "bg-white text-[#AEB7E1] border-[#AEB7E1]"
                    } hover:bg-[#cfd4ed] hover:border-[#0D28A6] hover:text-[#0D28A6] font-bold rounded-sm`}
                    onClick={() => setCategory("All")}
                  >
                    All
                  </button>

                  <button
                    className={`py-2 px-4 ml-4 color-[#0d28a6] border-2 ${
                      category == "Small"
                        ? "bg-[#CFD4ED] text-[#0D28A6] border-[#0D28A6]"
                        : "bg-white text-[#AEB7E1] border-[#AEB7E1]"
                    } hover:bg-[#cfd4ed] hover:border-[#0D28A6] hover:text-[#0D28A6] font-bold rounded-sm`}
                    onClick={() => setCategory("Small")}
                  >
                    Small
                  </button>

                  <button
                    className={`py-2 px-4 ml-4 color-[#0d28a6] border-2 ${
                      category == "Medium"
                        ? "bg-[#CFD4ED] text-[#0D28A6] border-[#0D28A6]"
                        : "bg-white text-[#AEB7E1] border-[#AEB7E1]"
                    } hover:bg-[#cfd4ed] hover:border-[#0D28A6] hover:text-[#0D28A6] font-bold rounded-sm`}
                    onClick={() => setCategory("Medium")}
                  >
                    Medium
                  </button>

                  <button
                    className={`py-2 px-4 ml-4 color-[#0d28a6] border-2 ${
                      category == "Large"
                        ? "bg-[#CFD4ED] text-[#0D28A6] border-[#0D28A6]"
                        : "bg-white text-[#AEB7E1] border-[#AEB7E1]"
                    } hover:bg-[#cfd4ed] hover:border-[#0D28A6] hover:text-[#0D28A6] font-bold rounded-sm`}
                    onClick={() => setCategory("Large")}
                  >
                    Large
                  </button>
                </div>

                {loading && (
                  <div className=" 2xl:mt-[16rem] xl:mt-[12rem] mt-[8rem] w-full flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}

                {!loading && cars.length === 0 && (
                  <div className=" 2xl:mt-[16rem] xl:mt-[12rem] mt-[8rem] w-full flex justify-center items-center">
                    <p className="text-2xl font-bold">No Data</p>
                  </div>
                )}

                {!loading && cars.length > 0 && (
                  <section className="mt-12 w-full grid grid-cols-3 gap-4">
                    {cars.map((car) => (
                      <div className="w-full bg-white p-6 text-sm" key={car.id}>
                        <div className="w-full h-32">
                          <img
                            src={car.imageUrl}
                            alt="car"
                            className="w-full object-contain h-full"
                          />
                        </div>

                        <div className="flex flex-col">
                          <p className="mt-4">
                            {car.name} / {car.size}
                          </p>
                          <p className="font-bold mt-4">
                            {numberToCurrency(car.cost)} / hari
                          </p>
                          <div className="flex flex-row mt-4">
                            <img
                              src="/images/key.png"
                              alt="key"
                              className="w-4 h-4"
                            />
                            <p className="ml-4">
                              {car.start_rent} - {car.finish_rent}
                            </p>
                          </div>
                          <div className="flex flex-row mt-4">
                            <img
                              src="/images/clock.png"
                              alt="clock"
                              className="w-4 h-4"
                            />
                            <p className="ml-4">
                              Updated at
                              {dateFormat(
                                new Date(car.updated_at),
                                " dd mmm yyyy"
                              )}
                            </p>
                          </div>
                          <div className="flex flex-row justify-between mt-4">
                            <DeleteButton
                              carId={car.id}
                              handleOpen={handleOpen}
                            />
                            <button
                              className="bg-[#5CB85F] hover:bg-[#29852C] flex items-center justify-center gap-x-2 w-[45%] py-3"
                              onClick={() => handleEdit(car.id)}
                            >
                              <div className="w-4 h-4">
                                <FaRegEdit
                                  style={{
                                    color: "white",
                                    fontSize: "1.05rem",
                                  }}
                                />
                              </div>
                              <p className="text-white">Edit</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>
                )}
              </div>
            </section>
          </div>
        </section>
      </div>

      {/* Delete Modals */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex-col flex items-center bg-[#fefefe] m-auto p-[2rem] border-[#888] border-2 w-[30%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-full text-end">
            <button
              className="text-[#aaaaaa] text-[28px] font-bold hover:text-[#000000] focus:border-0 hover:border-0 border-0 p-0 bg-[#fefefe]"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
          </div>

          <img src="/images/vehicle.png" alt="" />
          <p className="text-xl font-bold mt-4 text-center text-black">
            Menghapus Data Mobil
          </p>
          <p className="w-3-5 mb-0 text-center text-black">
            Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin
            menghapus?
          </p>
          <div className="w-full flex justify-around items-center mt-6">
            <button
              className="text-white font-bold py-2 w-2/6 border-0 bg-[#0D28A6] rounded-sm hover:bg-[#0A0573]"
              onClick={handleDelete}
            >
              Ya
            </button>
            <button
              id="cancelDeleteBtn"
              className="font-bold py-2 w-2/6 bg-white text-[#0D28A6] border-2 border-[#0D28A6] rounded-sm hover:bg-[#0D28A6] hover:text-white hover:border-[#0D28A6]"
              onClick={() => setOpen(false)}
            >
              Tidak
            </button>
          </div>
        </div>
      </Modal>
    </PrivateProvider>
  );
};

const numberToCurrency = (number: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(number);
};

export default Cars;
