import { useModal } from "../../context/Modal";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  css, // can pass styles through other components
  image, // if image use image as button instead
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };
  if (image) {
    return <img src={image} className={css} onClick={onClick} />;
  } else {
    return (
      <button className={css} onClick={onClick}>
        {buttonText}
      </button>
    );
  }
}

export default OpenModalButton;
