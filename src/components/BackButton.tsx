import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="p-4 text-dribbble-primary hover:text-dribbble-secondary transition-colors inline-flex items-center"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </button>
  );
}
