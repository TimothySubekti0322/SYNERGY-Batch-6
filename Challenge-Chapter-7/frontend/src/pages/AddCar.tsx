import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PrivateProvider from "../providers/PrivateProvider";
import SilverBox from "../components/SilverBox";
import DashboardMenu from "../components/DashboardMenu";
import CarsMenu from "../components/CarsMenu";
import TopNavbar from "../components/TopNavbar";
import WhiteNavbar from "../components/WhiteNavbar";
import CircularProgress from "@mui/material/CircularProgress";
import NameInput from "../components/Input/NameInput";
import CostInput from "../components/Input/CostInput";
import SizeInput from "../components/Input/SizeInput";
import ImageInput from "../components/Input/ImageInput";
import PhotoDescription from "../components/PhotoDescription";
import axios from "axios";


const AddCar = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [size, setSize] = useState("Small");
  const [photo, setPhoto] = useState<File | null>(null);
  const [fileName, setFileName] = useState("Upload your file");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    if (name === "name") {
      setName(value);
    } else if (name === "cost") {
      setCost(value);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
    console.log(e.target.value);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const files = (e.target as HTMLInputElement).files;
    setFileName(trimFileName(files![0].name));
    setPhoto(files![0]);
    console.log(files);
  };

  const handleBackButton = () => {
    window.history.back();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("cost", cost);
    formData.append("size", size);
    formData.append("photo", photo!);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/cars",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      window.location.href = "/cars?message=Data%20Berhasil%20Disimpan";
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
            <WhiteNavbar />

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
                    <p className="font-extrabold text-black">List Car</p>
                    <p className="text-black">Add New Car</p>
                  </Breadcrumbs>
                </div>

                {/* <!-- Title , message, and Button --> */}
                <div className="w-full flex justify-between items-center mt-6">
                  <p className="text-2xl font-bold">Add New Car</p>
                  <div id="messageContainer"></div>
                </div>

                {/* Form */}
                <section className="w-full bg-white rounded-sm p-4 mt-4">
                  <form>
                    {/* <!-- Nama --> */}
                    <NameInput  value="" handleInputChange={handleInputChange} />

                    {/* <!-- Sewa Per Hari --> */}
                    <CostInput value="" handleInputChange={handleInputChange} />

                    {/* <!-- Size --> */}
                    <SizeInput value="" handleSelectChange={handleSelectChange} />

                    {/* <!-- Photo --> */}
                    <ImageInput
                      handleFileChange={handleFileChange}
                      fileName={fileName}
                    />

                    {/* Photo description */}
                    <PhotoDescription />
                  </form>
                </section>

                {/* Cancel & Save Button */}
                <div className="w-full flex mt-20 mb-4">
                  <button
                    className="bg-white text-[#0D28A6] font-bold border-2 border-[#0D28A6] rounded-sm hover:bg-[#0D28A6] hover:text-white"
                    onClick={handleBackButton}
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-4 bg-[#0D28A6] font-bold text-white rounded-sm hover:bg-[#0A0573]"
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <CircularProgress style={{ fontSize: "0.5rem" }} />
                    ) : (
                      "save"
                    )}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </PrivateProvider>
  );
};

function trimFileName(fileName: string) {
  const maxLength = 15;
  const extension = fileName.slice(-4);

  if (fileName.length > maxLength) {
    return fileName.substring(0, maxLength) + "..." + extension;
  } else {
    return fileName;
  }
}

export default AddCar;
