import { FaEdit } from "react-icons/fa";
import GenericButton from "../../components/UI/GenericButton";
import { useLazyGetSinglePrivacyPolicyQuery } from "../../redux/slices/privacyPolicy";
import { useEffect } from "react";
import PATH from "../../navigation/Path";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Link from "antd/es/typography/Link";

export default function Index() {
  const [getSinglePrivacyPolicy, { data, isLoading }] = useLazyGetSinglePrivacyPolicyQuery();
  const navigate = useNavigate();

  useEffect(() => {
    getSinglePrivacyPolicy("7918bef3-1f04-4620-82ab-7d1e1d559056").catch((err) => {
      console.error(err);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data?.list) return <p>No Privacy Policy Found</p>;

  const { title, description, questions, dateOfCreation } = data.list;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 md:py-12 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{title || "Privacy Policy"}</h1>
        <GenericButton
          icon={<FaEdit size={18} />}
          label="Edit Policy"
          onClick={() =>
            navigate(PATH.EDIT_PRIVACY_POLICY, { state: { id: "7918bef3-1f04-4620-82ab-7d1e1d559056" } })
          }
        />
      </div>

      {/* Effective Date */}
      {dateOfCreation && (
        <p className="text-green-600 mb-6">
          <span className="font-medium">Effective Date:</span> {dayjs(dateOfCreation).format("MMMM D, YYYY")}
        </p>
      )}

      {/* Introduction */}
      <p className="text-gray-700 mb-8 leading-relaxed">{description || "No description provided."}</p>

      {/* Dynamically Rendered Sections */}
      {questions?.length > 0 && (
        <section className="mt-8">
          {questions.map((section: any, index: number) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-3">{section.question || "Untitled Section"}</h2>
              <p className="text-gray-700 leading-relaxed">{section.answer || "No content available."}</p>
            </div>
          ))}
        </section>
      )}

      {/* Additional Info */}
      <p className="text-sm text-gray-600 mt-8">
        This privacy policy may be updated periodically. Please review it regularly. For more details, check our{" "}
        <Link href="/terms" className="text-green-600 hover:text-green-700 underline">
          Terms of Use
        </Link>
        .
      </p>
    </div>
  );
}
