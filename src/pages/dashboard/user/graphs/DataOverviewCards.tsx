import { Col, Row } from "antd";
import { HiOutlineBuildingStorefront, HiUserGroup } from "react-icons/hi2";
import { BsBoxSeam, BsTicketPerforated } from "react-icons/bs";
import Typography from "../../../../components/UI/Typography";
import GenericCard from "../../../../components/UI/GenericCard";
import { useGetCouponCountsQuery, useGetProductCountQuery, useGetStoreCountQuery, useGetUserCountsQuery } from "../../../../redux/slices/dashboard";

const DataOverviewCards = () => {
  const { data: userStats } = useGetUserCountsQuery({});
  const { data: productStats } = useGetProductCountQuery({});
  const { data: couponStats } = useGetCouponCountsQuery({});
  const { data: storeStats } = useGetStoreCountQuery({});
console.log("couponStats", couponStats)
  const purpleColor = "#7FA842"; // Your original purple color

  const cardData = [
    {
      title: "Users Count",
      count: userStats?.list?.count || "1,234",
      icon: <HiUserGroup fontSize={50} color={purpleColor} />,
    },
    {
      title: "Stores Count",
      count: storeStats?.list?.count || "48",
      icon: <HiOutlineBuildingStorefront fontSize={50} color={purpleColor} />,
    },
    {
      title: "Products Count",
      count: productStats?.list?.count || "156",
      icon: <BsBoxSeam fontSize={50} color={purpleColor} />,
    },
    {
      title: "Coupons Count",
      count: couponStats?.list?.count || "200",
      icon: <BsTicketPerforated fontSize={50} color={purpleColor} />,
    },
  ];

  return (
    <Row gutter={[32, 32]} justify="start" className="mt-5">
      {cardData.map((card, index) => (
        <Col key={index} span={24} sm={12} md={12} lg={12} xl={6}>
          <GenericCard className="flex justify-around !mt-0 hover:shadow-lg transition-shadow duration-300">
            <div>
              <Typography
                variant="headingFourLight"
                className="text-gray-600 font-medium"
              >
                {card.title}
              </Typography>
              <span className="text-[33px] font-bold text-gray-800">
                {card.count}
              </span>
            </div>
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-[rgb(252,252,252)]">
                {card.icon}
              </div>
            </div>
          </GenericCard>
        </Col>
      ))}
    </Row>
  );
};

export default DataOverviewCards;
