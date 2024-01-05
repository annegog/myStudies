import Navbar from "../components/Navbar_students";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import * as React from "react";

export default function ProfilePage() {
  return (
    <div>
      <Navbar />
      <SecondNavbar />
      <div className="flex w-full flex-col items-stretch mt-4 px-16 max-md:max-w-full max-md:px-5">
        <div className="bg-zinc-300 flex justify-between gap-8 pl-16  pt-4 pb-7 rounded-3xl items-start max-md:max-w-full max-md:flex-wrap max-md:pl-5">
          <div className="aspect-[0.99] object-contain object-center w-[108px] overflow-hidden shrink-0 max-w-full mt-2 rounded-[50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="0.4"
              stroke="currentColor"
              // class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <div className="self-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
            <div className="text-black text-xl font-light self-stretch max-md:max-w-full">
              <h2>Όνομα: Δημήτρης Αντωνίου</h2>
              <h2 className="mt-5">E-mail: sdi2400001@di.uoa.gr</h2>
              <h2 className="mt-5">Ιδιότητα: Εκπαιδευόμενος</h2>
            </div>
          </div>
          <div className="self-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
            <div className="text-black text-xl font-light self-stretch max-md:max-w-full">
              <h2>Αριθμός μητρώου: 1115202400001</h2>
              <h2 className="mt-5">
                Σχολή - Τμήμα: Πληροφορικής και Τηλεπικοινωνιών
              </h2>
              <h2 className="mt-5">
                Μέλος από: Δευτέρα, 30 Σεπτεμβρίου 2024 - 10:00 π.μ.
              </h2>
            </div>
          </div>
        </div>
        {/* <div className="flex w-[859px] max-w-full items-stretch justify-between gap-5 ml-14 mt-6 self-start max-md:flex-wrap">
          <div className="flex justify-between gap-5 items-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b64231e129b1bba3c90ff1c8d20883a4fe23326de0df52fe5f2ab17b48ede7a0?"
              className="aspect-[1.25] object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
            />
            <div className="justify-center text-black text-xl font-medium self-stretch grow shrink basis-auto">
              Προσωπικά Στοιχεία
            </div>
          </div>
          <div className="flex justify-between gap-5 items-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/76c3c3670fcdad813dd781cc80e34918fe11354eeceb15157c3d6d1ab548b10d?"
              className="aspect-[1.31] object-contain object-center w-[21px] overflow-hidden shrink-0 max-w-full"
            />
            <div className="justify-center text-black text-xl font-medium self-stretch grow shrink basis-auto">
              Πληροφορίες Επικοινωνίας
            </div>
          </div>
        </div>
        <div className="self-center w-full max-w-[997px] mt-2 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[51%] max-md:w-full max-md:ml-0">
              <div className="bg-zinc-300 flex grow flex-col items-stretch w-full pl-3 pr-7 py-2.5 rounded-3xl max-md:max-w-full max-md:mt-10 max-md:pr-5">
                <div className="justify-center text-black text-xl font-medium">
                  Όνομα Πατέρα: Αντώνης
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3">
                  Όνομα Μητέρας: Αντωνία
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3">
                  Ημερομηνία Γέννησης: 23/06/2006
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3">
                  Οικογενειακή Κατάσταση: Άγαμος
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3.5">
                  Αριθμός Αδελφών: -
                </div>
                <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3">
                  Εκπλήρωση Στρατιωτικής Θητείας: Όχι
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3.5">
                  Πόλη/Χωριό Γέννησης: ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3">
                  Αριθμός Ταυτότητας: ΑΚ336699
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3">
                  Εκδούσα Αρχή: Κερατσινίου
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3.5">
                  AMKA: 23060622553
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[49%] ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-zinc-300 flex grow flex-col items-stretch w-full pt-2 pb-10 px-3 rounded-3xl max-md:max-w-full max-md:mt-10">
                <div className="text-black text-xl font-medium whitespace-nowrap mr-3.5 max-md:mr-2.5">
                  Μόνιμη Διεύθυνση Κατοικίας: Αιόλου 45
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3.5">
                  Μόνιμη Πόλη Κατοικίας: Αθήνα
                </div>
                <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3">
                  Τηλέφωνο Μόνιμης Κατοικίας: 6977553311
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3">
                  ΤΚ Μόνιμης Κατοικίας: 55443
                </div>
                <div className="justify-center text-black text-xl font-medium mt-3.5">
                  Προσωρινή Διεύθυνση Κατοικίας: -
                </div>
                <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3">
                  Προσωρινή Πόλη Κατοικίας: -
                </div>
                <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3.5">
                  Τηλέφωνο Προσωρινής Κατοικίας: -
                </div>
                <div className="justify-center text-black text-xl font-medium whitespace-nowrap mt-3">
                  ΤΚ Προσωρινής Κατοικίας: -
                </div>
                <div className="justify-center text-black text-xl font-medium mr-3.5 mt-3 max-md:mr-2.5">
                  Διεύθυνση Ηλεκτρονικού Ταχυδρομείου: -
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
