import Accordion from "@/components/Accordion";
import React from "react";

const FaqPage = () => {
  return (
    <>
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb */}
              <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="index.html">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item active">FAQ</li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      {/* CONTENT */}
      <section className="pt-7 pb-12">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <h3 className="mb-10 text-center">Frequently Asked Questionss</h3>
              <h5 className="mb-7">Orders:</h5>

              <ul className="list-group list-group-flush-x mb-9">
                <Accordion.Group>
                  <Accordion title="1. Bring of had which their whose you're it own?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="2. Over shall air can't subdue fly divide him?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="3. Waters one you'll creeping?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="4. Fowl, given morning seed fruitful kind beast be?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass. Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit. Minus
                    quibusdam quaerat nobis! Adipisci officiis fugiat
                    repellendus, saepe harum provident aut expedita voluptate
                    aspernatur veniam explicabo aliquid sed minima eligendi.
                    Quidem!
                  </Accordion>
                </Accordion.Group>
              </ul>
              <h5 className="mb-7">Shipping &amp; Returns:</h5>
              <ul className="list-group list-group-flush-x mb-9">
                <Accordion.Group>
                  <Accordion title="1. Seas their gathered fruitful whose rule darkness?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="2. Evening earth replenish land that his place?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="3. His in fowl morning to upon?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="4. Divide called which created was?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass. Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit. Minus
                    quibusdam quaerat nobis! Adipisci officiis fugiat
                    repellendus, saepe harum provident aut expedita voluptate
                    aspernatur veniam explicabo aliquid sed minima eligendi.
                    Quidem!
                  </Accordion>
                </Accordion.Group>
              </ul>

              <h5 className="mb-7">Payment:</h5>
              <ul className="list-group list-group-flush-x">
                <Accordion.Group>
                  <Accordion title="1. Seas their gathered fruitful whose rule darkness?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="2. Evening earth replenish land that his place?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="3. His in fowl morning to upon?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="4. Divide called which created was?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass. Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit. Minus
                    quibusdam quaerat nobis! Adipisci officiis fugiat
                    repellendus, saepe harum provident aut expedita voluptate
                    aspernatur veniam explicabo aliquid sed minima eligendi.
                    Quidem!
                  </Accordion>
                </Accordion.Group>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
