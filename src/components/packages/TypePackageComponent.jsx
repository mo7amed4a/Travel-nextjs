
const TypePackageComponent = ({ typePackages }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {typePackages.length > 0 &&
          typePackages.map((item, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-4">
                <span className="text-primary">{item.name.toUpperCase()}</span> May / Sep
              </h2>
              <div className="space-y-2">
                {item?.pricing &&
                  item?.pricing?.map((price, indx) => (
                    <div key={indx} className="grid grid-cols-2 border rounded">
                      <div className="bg-gray-500/20 p-2 text-2xl flex flex-col items-center justify-center">
                        {/^\d+\s*-\s*\d+$/.test(price.numUser) ? (
                            <span className="text-secondary/80 flex flex-col items-center">
                              <span>{price.numUser}</span>
                              <span>person</span>
                            </span>
                          ) : (
                            <span className="text-secondary/80 flex flex-col items-center">
                              <span>{price.numUser}</span>
                            </span>
                          )}
                      </div>
                      <div className="p-2 text-2xl flex flex-col items-center justify-center space-y-2">
                        {/^\d+\s*-\s*\d+$/.test(price.numUser) ? (
                            <>
                              <span className="text-orange-400 font-bold">{price.pricePerUser}$</span>
                              <span className="text-base text-gray-500">Per person</span>
                            </>
                          ) : (
                              <span className="text-orange-400 font-bold py-4">{price.pricePerUser}$</span>
                          )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TypePackageComponent;
