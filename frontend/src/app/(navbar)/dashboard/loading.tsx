import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader color="#000000" />
    </div>
  );
}
