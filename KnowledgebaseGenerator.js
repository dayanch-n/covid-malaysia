/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
const fs = require("fs");
const csv = require("csv-parser");

const convertedData = [];

fs.createReadStream("state_registration.csv")
  .pipe(csv())
  .on("data", (row) => {
    convertedData.push(row);
  })
  .on("end", () => {
    if (convertedData && convertedData.length > 0) {
        getTotalRegByState();
    }
  });

const getTotalRegByState = () => {
  const totalRegByState = convertedData.reduce((acc, curr) => {
    const index = acc.findIndex((res) => res.state === curr.state);

    if (index === -1) {
      acc.push({
        state: curr.state,
        totalRegistered: +curr.total,
      });
    } else {
      acc[index].totalRegistered += +curr.total;
    }
    return acc;
  }, []);

  var writeStream = fs.createWriteStream("Knowledgebase.pl");
  writeStream.write("% Knowledgebase\n");
  writeStream.write("% Facts");
  totalRegByState.forEach((state) => {
    const _state = state.state.toLowerCase().replace(/\s/g, "_").replace(/\./g, "");
    writeStream.write(
      `\nstate_registration(${_state}, ${state.totalRegistered}).`
    );
  })

  writeStream.write("\n");  
  writeStream.write("\n");  
  writeStream.write("% Rules\n");
  writeStream.write('state_registration_list(List):- findall({"state": State, "registration": Registration},(state_registration(State, Registration)), List), write(List).\n')
  writeStream.write('state_registration_list_asc(List):- findall({"state" : X, "registration" : Y}, state_registration(X, Y), List), sort(List, List), write(List).\n')
  writeStream.write('state_registration_list_desc(List):- findall({"state" : X,"registration" : Y}, state_registration(X, Y), List), sort(List, List), reverse(List, Reseult), write(Reseult).\n')
  

  writeStream.end();

  return totalRegByState;
};
