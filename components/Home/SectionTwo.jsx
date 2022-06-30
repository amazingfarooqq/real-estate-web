import React from "react";

import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdRealEstateAgent } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";
// import { Link } from 'react-router-dom';
import styles from "../../styles/Home.module.css";
import Image from "next/image";

export const SectionTwo = () => {
  return (
    <div className={`container ${styles.styles}`}>
      <div className="row mt-5">
        <div className="col-12 col-lg-6">
          <h2 className="p-0 m-0">Why Choose Us?</h2>
          <hr />
          <div className="row p-3 px-5">
            <AiFillSafetyCertificate
              className="fs-1"
              style={{ width: "110px" }}
            />
            <div
              className="col test-start"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="row">
                <div className="col-12 fs-3 fw-bold">East and Safety</div>
                <div className="col-12 fs-5">Lorem ipsum dolor sit amet.</div>
              </div>
            </div>
          </div>

          <div className="row p-3 px-5">
            <MdRealEstateAgent className="fs-1" style={{ width: "110px" }} />
            <div
              className="col test-start"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="row">
                <div className="col-12 fs-3 fw-bold">Investment Property</div>
                <div className="col-12 fs-5">Lorem ipsum dolor sit amet.</div>
              </div>
            </div>
          </div>

          <div className="row p-3 px-5">
            <FaHandshake className="fs-1" style={{ width: "110px" }} />
            <div
              className="col test-start"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="row">
                <div className="col-12 fs-3 fw-bold">Trusted Partners</div>
                <div className="col-12 fs-5">Lorem ipsum dolor sit amet.</div>
              </div>
            </div>
          </div>

          <div className="row p-3 px-5">
            <FaFileContract className="fs-1" style={{ width: "110px" }} />
            <div
              className="col test-start"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="row">
                <div className="col-12 fs-3 fw-bold">License and Contracts</div>
                <div className="col-12 fs-5">Lorem ipsum dolor sit amet.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <Image
            className="w-100 border"
            style={{ borderRadius: "20px" }}
            src="https://cdn.wallpapersafari.com/34/30/sR0vxY.jpg"
            alt="img"
          />

          <div className="row">
            <div className="col-12 fs-5 py-2 mx-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              exercitationem numquam officiis voluptatum corrupti eum
              repudiandae nostrum eaque iusto
            </div>
          </div>

          {/* <Link className='btn btn-color mx-2' to="about">Explore Now</Link> */}
        </div>
      </div>
    </div>
  );
};
