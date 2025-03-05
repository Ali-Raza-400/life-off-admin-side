
const Store = ({ store }:any) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img 
        src={store.logoUrl} 
        alt={store.name}
        className="w-32 h-32 object-contain mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
      <p className="text-sm text-gray-600 mt-2">{store.description}</p>
    </div>
  );
};

export default Store;