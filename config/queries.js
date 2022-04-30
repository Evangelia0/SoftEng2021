const totalload = `create table if not exists TotalLoad(
    DateTime TIMESTAMP primary key,
    ResolutionCode VARCHAR(4),
    AreaName VARCHAR(6),
    TotalLoadValue NUMERIC(10,3),
    UpdateTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`;
//const change = `drop table TotalLoad`;
module.exports = totalload;
//module.exports = change;
