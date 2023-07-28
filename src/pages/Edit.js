import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Edit = () => {
  const history = useHistory();
  const { rowIndex } = useParams();
  const [data, setData] = useState({
    CompanyName: "",
    Description: "",
    Applylink:"",
    date: new Date().toString(),
  });

  const getData = async () => {
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/3c4f0cfe-b47a-4db3-835a-10b00efa643b/${rowIndex}`
      );
      const data = await res.json();
      setData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/3c4f0cfe-b47a-4db3-835a-10b00efa643b/${rowIndex}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form style={{ maxWidth: 500, margin: "auto" }} onSubmit={handleSubmit}>
      <h1 className="text-muted text-center">Edit</h1>
      <div className="mb-3">
        <label htmlFor="CompanyName" className="form-label">
         CompanyName
        </label>
        <input
          type="text"
          className="form-control"
          name="CompanyName"
          value={data.CompanyName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="JobType&&Description" className="form-label">
          Job Type & Description
        </label>
        <textarea
          name="Description"
          cols="30"
          rows="3"
          className="form-control"
          value={data.Description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="ApplyLink" className="form-label">
          Apply Link
        </label>
        <input
          type="text"
          className="form-control"
          name="Applylink"
          value={data.Applylink}
          onChange={handleChange}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary">Update</button>
      </div>
    </form>
  );
};

export default Edit;
