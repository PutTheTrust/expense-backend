const axios = require("axios");

const fetchLoans = async (id) => {
  const results = await axios.get(`http://localhost:3000/api/v1/loans/${id}`);

  return results.data.data;
};

describe("Test get methods loans", () => {
  //   it("should return loans", async () => {
  //     const loans = await fetchLoans("650ae902faeb3de86150968c");

  //     expect(loans[0].lender).toBe("Mash");
  //   });

  it("should return loans mock", async () => {
    jest.spyOn(axios, "get").mockReturnValueOnce({
      data: {
        data: [
          {
            _id: "65489382c4519d1af04be91e",
            lender: "Kevin",
            borrowDate: "2023-11-18T00:00:00.000Z",
            due: "2023-11-25T00:00:00.000Z",
            status: "Unpaid",
            amount: 600,
            userId: "650ae902faeb3de86150968c",
            __v: 0,
          },
          {
            _id: "65489382c4519d1af04be91e",
            lender: "Kevin",
            borrowDate: "2023-11-18T00:00:00.000Z",
            due: "2023-11-25T00:00:00.000Z",
            status: "Unpaid",
            amount: 600,
            userId: "650ae902faeb3de86150968c",
            __v: 0,
          },
        ],
      },
    });

    const res = await fetchLoans("650ae902faeb3de86150968c");

    expect(res[0].lender).toBe("Kevin");
    // console.log(res);
  });
});

// 650ae902faeb3de86150968c
