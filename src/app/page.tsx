interface IntradayData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface TimeSeriesData {
  [timestamp: string]: IntradayData;
}

interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Interval": string;
  "5. Output Size": string;
  "6. Time Zone": string;
}

interface ApiResponse {
  "Meta Data": MetaData;
  "Time Series (5min)": TimeSeriesData;
}
// Fetch data from api in this react server component.
const fetchData = async (): Promise<ApiResponse> => {
  // Perform the fetch request
  const response = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
  );
  if (!response.ok) {
    // Handle the case where the request is not successful (e.g., network error)
    throw new Error(`Request failed with status: ${response.status}`);
  }

  // Parse the JSON response
  const responseData = await response.json();

  // Check if the response structure matches the ApiResponse interface
  if ("Meta Data" in responseData && "Time Series (5min)" in responseData) {
    return responseData as ApiResponse;
  } else {
    // Handle the case where the response structure does not match the interface
    throw new Error("Response structure does not match expected format");
  }
};

export default async function Home() {
  const data: ApiResponse = await fetchData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
      {/* Meta data section */}
      <section className="z-10 max-w-5xl w-full items-center justify-between font-mono">
        <h2 className="text-3xl text-white font-bold flex justify-center items-center py-4 bg-blue-500 ">
          Meta Data
        </h2>
        {Object.entries(data["Meta Data"]).map(([key, value]) => (
          <div
            key={key}
            className=" flex w-full justify-between lg:justify-start  border-b border-gray-300  pb-6 pt-8 mt-2 lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4"
          >
            <span className="font-bold  px-4">{key}: </span>
            <span> {value}</span>
          </div>
        ))}
      </section>

      {/* Time series section */}
      <section className="max-w-5xl w-full pt-8">
        <h2 className="text-3xl text-white font-bold flex justify-center items-center py-4 bg-blue-500 w-full">
          Time Series (5min)
        </h2>
        <div className="mb-32 mt-5 grid text-center  lg:w-full lg:mb-0 lg:grid-cols-3 lg:gap-6 lg:text-left">
          {Object.entries(data["Time Series (5min)"]).map(([key, value]) => (
            <div
              key={key}
              className=" rounded-lg border my-2 lg:m-0 p-4 transition-colors hover:border-blue-700 bg-gray-200"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>{key}</h2>

              <div className={`m-0 max-w-[30ch] text-sm `}>
                {Object.entries(value).map(([key2, value2]) => (
                  <div key={key2} className="px-2 flex gap-2">
                    <span className="font-semibold"> {key2} :</span>
                    <span>{value2}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
