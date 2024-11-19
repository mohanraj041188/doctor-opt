import React from 'react';
import SearchBannerForm from '../SearchBannerForm/SearchBannerForm';
import './SearchBanner.scss';
import { SearchIcon } from '../icons';
import Typewriter from '../TypeWritter/TypeWritter';
import AnimatedNumber from '../AnimatedNumber/AnimatedNumber';

const specialty = [
  "Allergist",
  "Anaesthetics",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Geriatrics",
  "Hematology",
  "Immunology",
  "Nephrology",
  "Neuropsychiatry",
  "Neurology",
  "Neurosurgery",
  "Oncology",
  "Ophthalmology",
  "Orthopaedics",
  "Paediatrics",
  "Pathology",
  "Pharmacology",
  "Psychiatry",
  "Public health",
  "Radiology",
  "Rheumatology",
  "Stomatology",
  "Urology",
  "Venereology",
];

const suggestions = [
  "Accident and emergency medicine",
  "Allergist",
  "Anaesthetics",
  "Cardiology",
  "Child psychiatry",
  "Clinical biology",
  "Clinical chemistry",
  "Clinical microbiology",
  "Clinical neurophysiology",
  "Craniofacial surgery",
  "Dermatology",
  "Endocrinology",
  "Family and General Medicine",
  "Gastroenterologic surgery",
  "Gastroenterology",
  "General Practice",
  "General surgery",
  "Geriatrics",
  "Hematology",
  "Immunology",
  "Infectious diseases",
  "Internal medicine",
  "Laboratory medicine",
  "Nephrology",
  "Neuropsychiatry",
  "Neurology",
  "Neurosurgery",
  "Nuclear medicine",
  "Obstetrics and gynaecology",
  "Occupational medicine",
  "Oncology",
  "Ophthalmology",
  "Oral and maxillofacial surgery",
  "Orthopaedics",
  "Otorhinolaryngology",
  "Paediatric surgery",
  "Paediatrics",
  "Pathology",
  "Pharmacology",
  "Physical medicine and rehabilitation",
  "Plastic surgery",
  "Podiatric surgery",
  "Preventive medicine",
  "Psychiatry",
  "Public health",
  "Radiation Oncology",
  "Radiology",
  "Respiratory medicine",
  "Rheumatology",
  "Stomatology",
  "Thoracic surgery",
  "Tropical medicine",
  "Vascular surgery",
  "Urology",
  "Venereology",
];

function SearchBanner() {
  return (
    <section className="search-banner">
      <h1 className='search-banner__intro-text'><Typewriter cursor=" " texts={specialty} delay={100} infinite={true}></Typewriter> Appointment <br />Booking in Seconds</h1>
      <p className='search-banner__intro-description'>Introducing the world's best search engine for Appointments.</p>
      <SearchBannerForm suggestions={suggestions}></SearchBannerForm>
      <div className='search-banner__note'>
        <SearchIcon className='search-banner__note--icon'></SearchIcon>
        <p className='search-banner__note--text'><AnimatedNumber targetNumber={81681} /> appointments and counting ...</p>
      </div>
    </section>
  );
}

export default SearchBanner;
