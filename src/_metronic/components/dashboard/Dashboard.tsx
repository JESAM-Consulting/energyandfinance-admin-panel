import React, { useEffect, useState } from "react";
import { ApiGet } from "../../../helpers/API/ApiData";
import CountUp from 'react-countup';
import { getUserInfo } from "../../../utils/user.util";
import Card from 'react-bootstrap/Card';
import { useHistory } from "react-router-dom";
import axios from "axios";

export function Dashboard() {

  const [contact1, setContact1] = useState<any>();
  const [interview4, setInterview4] = useState<any>();
  const history = useHistory<any>();
const BaseApi_URL = "https://fe-lead-commen-api.rejoicehub.com/FE_API/lead_api/v1/"

  useEffect(() => {

    getAllInterviewFour();
  }, [])
  const getAllInterviewFour = async () => {
     axios.get(`${BaseApi_URL}/get-energy-form`)
      .then((res: any) => {
        console.log("****",res)
        setInterview4(res?.data?.count);
      })

  }

  const jumpOnContact1 = (e: any) => {
    history.push("/contact")
  }
  return (
    <>

        <>

          <div
            className={`card card-custom`}
            style={{ backgroundColor: "gray" }}
          >
            <div className="card-header border-0  py-1 px-1 m-5">
              <div className="card-body p-0 position-relative overflow-hidden">
                <div
                  className="card-rounded-bottom"
                  style={{ height: "25px" }}
                >
                  <h4 className="font-weight-bolder text-white pt-2 pl-6">
                    Dashboard
                  </h4>
                </div>
             

                  <>
                    <div className="card-spacer">
                      <div
                        className="carder-box carder-box-new-grid"
                      >
                        <>

                         
                          <div className="p-6 rounded" style={{ backgroundColor: "#93c45e" }}>
                            <div className="row">
                              <div className="col-12">

                                <div className="d-flex justify-content-between">
                                  <div>
                                    <h1 className="font-weight-bold" style={{ fontSize: "40px" }}>
                                      {interview4 && (
                                        <CountUp end={interview4} start={0} delay={1} />
                                      )
                                      }
                                    </h1>
                                  </div>
                                  <div style={{ display: "flex", marginTop: "6px" }}>
                                    <i className="fa-solid fa-user" style={{ fontSize: "25px", color: "gray" }}></i>
                                  </div>
                                </div>

                              </div>

                              <span className="font-weight-bold font-size-h3 d-block my-2 ml-3" style={{ cursor: "pointer" }} >
                              Energy & Finance
                              </span>
                            </div>
                            <div className="showMore" onClick={(e) => jumpOnContact1(e)}>
                              <span>  mehr anzeigen <span className="fa-solid fa-arrow-right-long ml-2"></span>
                              </span>
                            </div>
                          </div>
                        </>

                      </div>
                    </div>
                  </>
                  
                  <>
                    <div className="card-spacer">
                      <div
                        className="carder-box"
                        style={{
                          display: "grid",
                          gap: "12px",
                          gridTemplateColumns: "repeat(5,2fr)",
                          padding: "20px",

                        }}
                      >


                      </div>
                    </div>

                  </>
                
              </div>
            </div>
          </div>
        </>
 
    </>
  );
}