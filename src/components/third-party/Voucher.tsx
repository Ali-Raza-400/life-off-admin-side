
const Voucher = ({ voucher }:any) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{voucher.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{voucher.description}</p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {voucher.discountAmount}% OFF
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs text-gray-500">Valid until: {new Date(voucher.endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Voucher;