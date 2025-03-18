import { FaEdit } from "react-icons/fa";
import GenericButton from "../../components/UI/GenericButton";
import { useEffect } from "react";
import PATH from "../../navigation/Path";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Link from "antd/es/typography/Link";
import { useLazyGetSingleTermAndConditionQuery } from "../../redux/slices/termsdConditions";

export default function Index() {
  const [getSingleTermAndCondition, { data, isLoading }] = useLazyGetSingleTermAndConditionQuery();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleTermAndCondition("1ab5374e-0504-414a-ba16-95233c852b92").catch((err) => {
      console.error(err);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data?.list) return <p>No Terms Conditions Found</p>;
console.log("data.list::",data.list);

  const { title, description, sections:questions, dateOfCreation } = data.list;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 md:py-12 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{title || "Terms Conditions"}</h1>
        <GenericButton
          icon={<FaEdit size={18} />}
          label="Edit Terms Conditions"
          onClick={() =>
            navigate(PATH.EDIT_TERMS_CONDITIONS, { state: { termsConditionID: "1ab5374e-0504-414a-ba16-95233c852b92" } })
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
              <h2 className="text-2xl font-bold mb-3">{section.title || "Untitled Section"}</h2>
              <p className="text-gray-700 leading-relaxed">{section.description || "No content available."}</p>
            </div>
          ))}
        </section>
      )}

      {/* Additional Info */}
      <p className="text-sm text-gray-600 mt-8">
        This Terms Conditions may be updated periodically. Please review it regularly. For more details, check our{" "}
        <Link href="/terms" className="text-green-600 hover:text-green-700 underline">
          Terms of Use
        </Link>
        .
      </p>
    </div>
  );
}
