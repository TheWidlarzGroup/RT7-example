import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import TableContainer from "./TableContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { SelectColumnFilter } from "./filters";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const body = await response.json();
      const contacts = body.results;
      console.log(contacts);
      setData(contacts);
    };
    doFetch();
  }, []);

  const renderRowSubComponent = (row) => {
    const {
      name: { first, last },
      location: { city, street, postcode },
      picture,
      cell,
    } = row.original;
    return (
      <Card style={{ width: "18rem", margin: "0 auto" }}>
        <CardImg top src={picture.large} alt="Card image cap" />
        <CardBody>
          <CardTitle>
            <strong>{`${first} ${last}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Phone</strong>: {cell} <br />
            <strong>Address:</strong>{" "}
            {`${street.name} ${street.number} - ${postcode} - ${city}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("expander", {
        id: "expander", // 'id' is required
        cell: ({ row }) => <span>{row.isExpanded ? "👇" : "👉"}</span>,
      }),
      columnHelper.accessor("name.title", {
        header: "Title",
        enableSorting: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      }),
      columnHelper.accessor("name.first", {
        header: "First Name",
      }),
      columnHelper.accessor("name.last", {
        header: "Last Name",
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.accessor("location.city", {
        header: "City",
      }),
      columnHelper.accessor(
        (values) => {
          const { latitude, longitude } = values.location.coordinates;
          const first = Number(latitude) > 0 ? "N" : "S";
          const second = Number(longitude) > 0 ? "E" : "W";
          return first + "/" + second;
        },
        {
          header: "Hemisphere",
          enableSorting: true,
          Filter: SelectColumnFilter,
          filter: "equals",
          cell: ({ getValue }) => {
            const value = getValue();

            const pickEmoji = () => {
              let first = value[0]; // N or S
              let second = value[2]; // E or W
              const options = ["⇖", "⇗", "⇙", "⇘"];
              let num = first === "N" ? 0 : 2;
              num = second === "E" ? num + 1 : num;
              return options[num];
            };

            return (
              <div style={{ textAlign: "center", fontSize: 18 }}>
                {pickEmoji(value)}
              </div>
            );
          },
        }
      ),
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </Container>
  );
};

export default App;
