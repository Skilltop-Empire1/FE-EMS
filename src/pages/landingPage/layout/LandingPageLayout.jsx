import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import style from "./LandingPageLayout.module.css";
import WatchDemo from "../nav/WatchDemo";

function LandingPageLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDemoClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <main className={style.mainContainer}>
        {/* Hero Section */}
        <section id="video" className={style.heroSection}>
          <div className={style.heroContent}>
            <h1>Streamline Healthcare Operations with EHS</h1>
            <p>
              Your all-in-one health management system to efficiently manage
              departments, staff, patients, admission, appointments, billing,
              discharge, and more.
            </p>
            <p onClick={handleDemoClick} className={style.requestDemo}>
              <b>Request a Demo</b>
            </p>
          </div>
          <div className={style.heroImage}>
            <img src="/hero.svg" alt="Hero illustration" />
          </div>
        </section>

        {/* Services Section */}
        <section className={style.serviceSection}>
          {/* Service Items */}
          {[
            {
              imgSrc: "/staff.svg",
              alt: "Staff Management",
              title: "Staff Management",
              description:
                "Seamlessly organize departments, assign staff, and track performance.",
            },
            {
              imgSrc: "/patient.svg",
              alt: "Patient Records",
              title: "Patient Records",
              description:
                "Manage patient data, history, and prescriptions in a secure, compliant manner.",
            },
            {
              imgSrc: "/appointment.svg",
              alt: "Appointments",
              title: "Appointments",
              description:
                "Enable health organizations to effortlessly schedule and manage appointments with a seamless calendar.",
            },
          ].map(({ imgSrc, alt, title, description }, idx) => (
            <div className={style.serviceItem} key={idx}>
              <div>
                <img src={imgSrc} alt={alt} />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Performance Section */}
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
            <a
              href="https://skilltopempire.com/contact/"
              className={style.contactLink}
            >
              <strong>
                Contact us <span>&rarr;</span>
              </strong>
            </a>
          </div>
        </section>

        {/* Additional Sections */}
        {[
          {
            imgSrc: "/homeView.svg",
            alt: "Home View",
            title: "Gain quick insights into patient and healthcare activity",
            description:
              "Take immediate actions to improve efficiency. We provide data-driven trends and strategies to enhance healthcare operations, ensuring your decisions are data-driven.",
          },
          {
            imgSrc: "/solutions.svg",
            alt: "Solutions",
            title:
              "Improve your patients' outcomes with seamless healthcare delivery solutions.",
            description:
              "Our EHS helps healthcare providers make more accurate diagnoses and treatment decisions. This leads to improved treatment outcomes and reduced healthcare costs. It also improves patient safety by reducing the risk of medication errors.",
          },
        ].map(({ imgSrc, alt, title, description }, idx) => (
          <section key={idx} className={style.insightSection}>
            <div className={style.insightContainer}>
              <div className={style.insightContent}>
                <h3>{title}</h3>
                <p>{description}</p>
                <a
                  href="https://skilltopempire.com/contact/"
                  className={style.contactLink}
                >
                  <strong>
                    Contact us <span>&rarr;</span>
                  </strong>
                </a>
              </div>
              <div className={style.insightImage}>
                <img src={imgSrc} alt={alt} />
              </div>
            </div>
          </section>
        ))}

        {/* Testimonials Section */}
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
            {/* Testimonial Items */}
            {[
              {
                imgSrc: "/drSarah.svg",
                name: "Dr. Sarah",
                position: "Chief Medical Officer – Green Valley Hospital",
                testimonial:
                  "EHS has completely transformed how we manage our healthcare operations. From patient scheduling to staff management, everything is streamlined and accessible in one place. The real-time updates have made decision-making faster and more accurate.",
              },
              {
                imgSrc: "/drMark.svg",
                name: "Mark",
                position: "IT Director – City Health Medical Center",
                testimonial:
                  "The patient management feature has significantly improved our workflow. We can now track patient progress efficiently, and the appointment scheduling tool has helped us reduce wait times. Our team is more organized than ever thanks to EHS.",
              },
            ].map(({ imgSrc, name, position, testimonial }, idx) => (
              <div className={style.testimonialItem} key={idx}>
                <img src={imgSrc} alt={name} />
                <p>
                  <strong>{name}</strong>
                </p>
                <h3>{position}</h3>
                <p>{testimonial}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Streamline Section */}
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
            <a href="https://skilltopempire.com/contact/">
              <button>Contact us &rarr;</button>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={style.footer}>
        <div className={style.socialMedia}>
          {[
            {
              href: "https://www.facebook.com/people/Skilltop-Empire/61560962855881/",
              icon: faFacebook,
              label: "Facebook",
            },
            {
              href: "https://x.com/i/flow/login?redirect_after_login=%2FSkilltopempire",
              icon: faXTwitter,
              label: "Twitter",
            },
            {
              href: "https://www.linkedin.com/company/skilltop-empire/",
              icon: faLinkedin,
              label: "LinkedIn",
            },
            {
              href: "https://www.instagram.com/skilltopempire/?igsh=YzljYTk1ODg3Zg%3D%3D#",
              icon: faInstagram,
              label: "Instagram",
            },
          ].map(({ href, icon, label }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${label}`}
            >
              <FontAwesomeIcon icon={icon} size="2x" />
            </a>
          ))}
        </div>
        <p>All rights reserved Skilltop Empire, {currentYear}.</p>
      </footer>

      {/* Modal */}
      <WatchDemo isOpen={isModalOpen} onRequestClose={handleModalClose} />
    </>
  );
}

export default LandingPageLayout;
