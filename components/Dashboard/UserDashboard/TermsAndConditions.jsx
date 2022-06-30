import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const TermsAndConditions = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="btn link-primary py-1 px-3"
      >
        I Agree to These Terms and conditions
      </button>
      <Modal
        fullscreen={fullscreen}
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Terms and Conditions
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid bg-light">
          <div className="row">
            <div className="col-12">
              <div>
                <p>
                  <span className="fs-5 fw-bold">RIGHTS TO SELL.</span>The
                  Seller grants the Agency: (check one)
                </p>
                <p>
                  <span className="fs-5 fw-bold">
                    {" "}
                    - Exclusive Right to Sell
                  </span>
                  The sole and exclusive right to sell, trade, convey, or
                  exchange the Property during the Listing Period in accordance
                  with the terms and conditions set forth in this Agreement. The
                  Seller hereby appoints the Agency as the exclusive agent and
                  all inquiries made on the Property shall be referred to the
                  Agency. The Agency shall be paid the Commission whether or not
                  the Property was sold, directly or indirectly, through the
                  Agency.
                </p>
                <p>
                  <span className="fs-5 fw-bold"> - Exclusive Agency:</span>
                  The exclusive agency right to sell, trade, convey, or exchange
                  the Property during the Listing Period in accordance with the
                  terms and conditions set forth in this Agreement. The Seller
                  hereby appoints the Agency as the exclusive agent and to
                  represent the Seller as their client ONLY if a potential Buyer
                  is produced by the Agency. The Seller retains the right to
                  sell the Property directly, on their own behalf, with no
                  commission due to the Agency.
                </p>
                <p>
                  <span className="fs-5 fw-bold"> - Open Listing:</span>: The
                  general non-exclusive right to sell, trade, convey, or
                  exchange the Property during the Listing Period in accordance
                  with the terms and conditions set forth in this Agreement. The
                  Seller hereby appoints the Agency to represent the Seller as
                  their client ONLY if a potential Buyer is produced by the
                  Agency. The Seller retains the right to sell the Property
                  directly, on their own behalf, with no commission due to the
                  Agency. In addition, the Seller reserves the right to enter
                  into similar arrangements with other real estate agents.
                </p>
                <p>
                  <span className="fs-5 fw-bold"> - PURCHASE PRICE:</span>:
                  Under the terms of this Agreement, the Seller hereby grants
                  the Agency rights to sell the Property, including any Personal
                  Property, for the following amount: [WRITTEN PURCHASE PRICE]
                  Dollars ($[NUMERICAL PURCHASE PRICE]) (the “Purchase Price”).
                </p>
                <p>
                  <span className="fs-5 fw-bold">
                    {" "}
                    - PERIOD OF AGREEMENT. :
                  </span>
                  : This Agreement shall start on [MM/DD/YYYY] (the “Effective
                  Date”) and end on [MM/DD/YYYY] at 12:00 midnight (the “Listing
                  Period”), unless the expiration date is extended in writing
                </p>
                <p>
                  <span className="fs-5 fw-bold">
                    {" "}
                    - Listing Period Extension. :
                  </span>
                  : The Commission shall be due if the Property is sold,
                  conveyed, exchanged, optioned, or otherwise transferred within
                  [#] days (the “Extension Period”) after the expiration of the
                  Listing Period to anyone with whom the Broker or the Agency
                  has negotiated unless the Property is listed, in good faith,
                  with another real estate agency. The term “negotiation” shall
                  include providing information about the Property, showing the
                  Property, or presenting an offer on the Property. All rights
                  under this Section shall terminate upon the expiration of the
                  Extension Period.
                </p>
                <p>
                  <span className="fs-5 fw-bold"> - COMMISSION :</span>: The
                  Agency, as compensation for finding a Buyer that is ready,
                  willing, and able to purchase the Property upon the terms and
                  conditions mentioned herein or at any price or terms
                  acceptable to the Seller, shall receive: (check one)
                </p>
                <p>
                  <span className="fs-5 fw-bold">
                    {" "}
                    - Percentage (%) Commission :
                  </span>
                  : : A percentage based on the sales price, as stated in the
                  purchase contract between the Buyer and the Seller, in the
                  amount of [WRITTEN PERCENTAGE] percent ([#]%) (the
                  “Commission”).
                </p>
                <p>
                  <span className="fs-5 fw-bold">
                    {" "}
                    - Fixed Payment Commission :
                  </span>A fixed payment in the amount of
[WRITTEN AMOUNT] Dollars ($[NUMERICAL AMOUNT]) (the “Commission”).

The Commission is due and payable at closing by the Seller. The amount or rate of real estate commissions is not fixed by law. The commission is set by each Broker individually and may be negotiable between the Seller and the Broker.

                </p>
                <p>
                  <span className="fs-5 fw-bold">
                    {" "}
                    - Leasing :
                  </span>During the Listing Period, if the Agency finds a ready, willing, and able Tenant that agrees to rent the Property, the Agency shall be due
[WRITTEN PERCENTAGE] percent ([#]%) of the total rent amount stated in the rental agreement for the lease term. The lease term shall be defined as the period between the start and end dates listed in the rental agreement, not including any renewal period(s). If the Tenant agrees to rent the Property on a month-to-month basis, the Agency shall be due the equivalent of one (1) month’s rent (the “Commission”).

                </p>
                <p>
                  <span className="fs-5 fw-bold">
                    {" "}
                    - Deed Type.  :
                  </span>The Seller agrees to convey the Property by [DEED TYPE] deed
                </p>
                <p>
                  <span className="fs-5 fw-bold">
                    {" "}
                    - Ready, Willing, and Able Buyer.   :
                  </span>If a suit is brought against the Seller to collect compensation provided herein, or if the Agency successfully defends any action brought against the Broker by the Seller relating to this Agreement or under any purchase contract relating to the Property, and the Agency prevails, the Seller agrees to pay all costs incurred by the Agency in connection with such action, including reasonable attorneys’ fees.



                </p>
                <p>
                  <span className="fs-5 fw-bold">
                    {" "}
                    - Litigation   :
                  </span>Under this Agreement, the Commission shall be owed to the Agency if a ready, willing, and able Buyer is produced and refused by the Seller. The definition of a ready, willing, and able buyer shall include, but not be limited to, a purchase contract that meets or exceeds the Purchase Price and does not contain contingencies or terms that are unreasonable or outside of industry standards. The Seller has an obligation to negotiate all offers presented by the Agency in “good faith.”


                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
