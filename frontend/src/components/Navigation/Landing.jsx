import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./Landing.css";

export const Landing = () => {
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <img
        className="landing-image-logo"
        src="https://bramble-bucket.s3.amazonaws.com/1712536166045.png"
        alt="Bramble Logo"
      />
      <h1 className="landing-welcome">
        Welcome to Bramble, you are about to embark on a journey through many
        magical stores and the viewing of surreal products. Here at Bramble we
        allow you to take control of what&apos;s for sale, and quite frankly you
        can truly find anything.
      </h1>
      <div className="landing-images">
        {!user ? (
          <>
            <div>
              <OpenModalButton
                image={
                  "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712568617299.png"
                }
                css={"landing-image-btn"}
                modalComponent={<LoginFormModal />}
              />
              <p className="landing-p">Already a member? Log in here</p>
            </div>
            <div>
              <OpenModalButton
                image={
                  "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712568720214.png"
                }
                css={"landing-image-btn"}
                modalComponent={<SignupFormModal />}
              />
              <p className="landing-p">Haven&apos;t joined up? Sign up here</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <img
                className="landing-image-btn"
                src="https://bramble-bucket.s3.amazonaws.com/1712564532018.png"
                alt="New Product Button"
                onClick={() => navigate("/products/new")}
              />
              <p className="landing-p">Let&apos;s make a new product!</p>
            </div>
            <div>
              <img
                className="landing-image-btn"
                src="https://bramble-bucket.s3.us-east-2.amazonaws.com/1712564830103.png"
                alt="New Shop Button"
                onClick={() => navigate("/shops/new")}
              />
              <p className="landing-p">For the true entrepreneur</p>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};
