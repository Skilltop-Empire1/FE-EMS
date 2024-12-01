import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import style from "./LandingPageLayout.module.css";

function LandingPageLayout() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <main className={style.mainContainer}>
        <section id="video" className={style.heroSection}>
          <div className={style.heroContent}>
            <h1>Streamline Healthcare Operations with EHS</h1>
            <p>
              Your all-in-one health management system to efficiently manage
              departments, staff, patients, admission, appointments, billing,
              discharge, and more.
            </p>
            <a id="demo" href="http://" className={style.requestDemo}>
              <b>Request a Demo</b>
            </a>
          </div>
          <div className={style.heroImage}>
            <img src="/hero.svg" alt="Hero illustration" />
          </div>
        </section>
        <section className={style.serviceSection}>
          <div className={style.serviceItem}>
            <div>
              <img src="/staff.svg" alt="Staff Management" />
            </div>
            <div>
              <h3>Staff Management</h3>
              <p>
                Seamlessly organize departments, assign staff, and track
                performance.
              </p>
            </div>
          </div>
          <div className={style.serviceItem}>
            <div>
              <img src="/patient.svg" alt="Patient Records" />
            </div>
            <div>
              <h3>Patient Records</h3>
              <p>
                Manage patient data, history, and prescriptions in a secure,
                compliant manner.
              </p>
            </div>
          </div>
          <div className={style.serviceItem}>
            <div>
              <img src="/appointment.svg" alt="Appointments" />
            </div>
            <div>
              <h3>Appointments</h3>
              <p>
                Enable health organizations to effortlessly schedule and manage
                appointments with a seamless calendar.
              </p>
            </div>
          </div>
        </section>
        <section className={style.performanceSection}>
          <div className={style.performanceImage}>
            <img src="/dashboard.svg" alt="Dashboard" />
          </div>
          <div className={style.performanceContent}>
            <h3>
              Track your health organization's performance with our intelligent
              system.
            </h3>
            <p>
              We provide valuable insights and strategies for optimizing
              healthcare operations and ensuring improved patient outcomes.
            </p>
            <a href="" className={style.contactLink}>
              <strong>
                Contact us <span>&rarr;</span>
              </strong>
            </a>
          </div>
        </section>
        <section className={style.insightSection}>
          <div className={style.insightContainer}>
            <div className={style.insightContent}>
              <h3>Gain quick insights into patient and healthcare activity</h3>
              <p>
                Take immediate actions to improve efficiency. We provide
                data-driven trends and strategies to enhance healthcare
                operations, ensuring your decisions are data-driven.
              </p>
              <a href="" className={style.contactLink}>
                <strong>
                  Contact us <span>&rarr;</span>
                </strong>
              </a>
            </div>
            <div className={style.insightImage}>
              <img src="/homeView.svg" alt="Home View" />
            </div>
          </div>
        </section>
        <section className={style.solutionsSection}>
          <div className={style.solutionsImage}>
            <img src="/solutions.svg" alt="Solutions" />
          </div>
          <div className={style.solutionsContent}>
            <h3>
              Improve your patients' outcomes with seamless healthcare delivery
              solutions.
            </h3>
            <p>
              Our EHS helps healthcare providers make more accurate diagnoses
              and treatment decisions. This leads to improved treatment outcomes
              and reduced healthcare costs. It also improves patient safety by
              reducing the risk of medication errors.
            </p>
            <a href="" className={style.contactLink}>
              <strong>
                Contact us <span>&rarr;</span>
              </strong>
            </a>
          </div>
        </section>
        <section className={style.testimonialsSection}>
          <div className={style.testimonialsContent}>
            <h3>Achieve Streamlined Healthcare Operations with EHS</h3>
            <p>
              Explore how healthcare solution providers have revolutionized
              their management processes and enhanced patient care through
              real-time updates and robust features tailored for efficient
              healthcare workflows.
            </p>
          </div>
          <div className={style.testimonials}>
            <div className={style.testimonialItem}>
              <img src="/drSarah.svg" alt="Dr. Sarah" />
              <p>
                <strong>Dr. Sarah</strong>
              </p>
              <h3>Chief Medical Officer – Green Valley Hospital</h3>
              <p>
                EHS has completely transformed how we manage our healthcare
                operations. From patient scheduling to staff management,
                everything is streamlined and accessible in one place. The
                real-time updates have made decision-making faster and more
                accurate.
              </p>
            </div>
            <div className={style.testimonialItem}>
              <img src="/drMark.svg" alt="Mark" />
              <p>
                <strong>Mark</strong>
              </p>
              <h3>IT Director – City Health Medical Center</h3>
              <p>
                The patient management feature has significantly improved our
                workflow. We can now track patient progress efficiently, and the
                appointment scheduling tool has helped us reduce wait times. Our
                team is more organized than ever thanks to EHS.
              </p>
            </div>
          </div>
        </section>
        <section className={style.streamlineSection}>
          <div className={style.streamlineContent}>
            <h3>
              Streamline Your Healthcare Operations and Patient Management
              Effortlessly
            </h3>
            <p>
              With our suite of powerful tools, you can efficiently manage your
              healthcare operations, including patient records and staff
              workflows, billings, and more without complicated setups. Simplify
              your processes today and focus on delivering exceptional care.
            </p>
          </div>
          <div className={style.streamlineButton}>
            <button>Contact us &rarr;</button>
          </div>
        </section>
      </main>
      <footer className={style.footer}>
        <div className={style.socialMedia}>
          <a
            href="https://www.facebook.com/people/Skilltop-Empire/61560962855881/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://x.com/i/flow/login?redirect_after_login=%2FSkilltopempire"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faXTwitter} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/company/skilltop-empire/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://www.instagram.com/skilltopempire/?igsh=YzljYTk1ODg3Zg%3D%3D#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>

        <p>All rights reserved Skilltop Empire, {currentYear}.</p>
      </footer>
    </>
  );
}

export default LandingPageLayout;
