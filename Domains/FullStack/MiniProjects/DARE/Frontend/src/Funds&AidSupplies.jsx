import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function FundsandAidSupplies() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section className="bg-blue-50">
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5e5d4596dd9b2a5f3f3b20a5/1584795754602-VJAQ3KKEM63S3Y5V3LH8/donate-and-help.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold text-violet-800">
                Support Disaster Relief Efforts Now!
              </h1>
              <p className="py-6 text-lg text-blue-800 ">
                "Your generosity can be the lifeline for those facing the
                aftermath of disasters. Together, let's make a difference by
                extending a helping hand to those in need. Every donation, no
                matter how small, brings hope and relief to communities in
                crisis. Join us in making a meaningful impact today."
              </p>

              {/* <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/donate");
                }}
              >
                {" "}
                Donate Now
              </button> */}
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold flex flex-col items-center text-violet-800 justify-center m-8">
          How you can help?
        </h1>
        <section className="flex flex-col items-center justify-center m-8">
          <div className="card card-side glass  bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://www.inquirer.com/resizer/xncca87jCyEV6Yx9aY8ZM-lbU7o=/760x507/smart/filters:format(webp)/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/D2LTRFIHZZEXTAJ55QIZBWGJEU.jpg"
                alt="Donation"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-blue-800">Donate Funds:</h2>
              <p>
                Your donations will be used to address the most critical needs.
                Your generosity will have a positive impact donations will have
                on the lives of those affected. Your donations will be used to:
                <ul>
                  <li>
                    Providing food, water, and shelter to displaced families.
                  </li>
                  <li>
                    Delivering medical supplies and supporting healthcare
                    services.
                  </li>
                  <li>
                    Aiding in search and rescue efforts. Assisting with
                    long-term recovery and rebuilding efforts.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center m-8">
          <div className="card card-side glass  bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://www.vmcdn.ca/f/files/shared/stock-images/fooddrive_2000x1333.jpg;w=960"
                alt="Donation"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-blue-800">Donate Supplies:</h2>
              <p>
                Because of your generosity, this family won't have to go hungry
                or sleep in the cold. Donate essential supplies today. Help
                bring comfort and security to families affected by disaster.
                Donate blankets and non-perishable food now.
                <ul>
                  <li>Non-perishable </li>
                  <li>Hygiene products</li>
                  <li>Food</li>
                  <li>Blankets</li>
                  <li>First-Aid kits</li>
                </ul>
              </p>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default FundsandAidSupplies;
