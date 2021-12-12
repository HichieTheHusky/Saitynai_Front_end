import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListTypes({ access_token }) {
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ types: [] });

  function handleDelete(id) {
    console.log(id);
    async function deleteType() {
      setLoading(true);
      const response = await fetch(`http://localhost:98/api/types/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'x-access-tokens': `${access_token}`,
        },
      });
      const result = await response.json();
      setLoading(false);
      console.log(result);
    }
    deleteType();
  }

  useEffect(() => {
    setLoadingData(true);
    console.log(access_token)
    async function fetchData() {
      const repsonse = await fetch("http://127.0.0.1:5000/Testy/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'x-access-tokens': `${access_token}`,
        },
      });
      const result = await repsonse.json();
      setData({ types: result.data });
      setLoadingData(false);
    }
    fetchData();
    console.log(data);
  }, []);

  return (
    <>
      <div className=".p-3">
        <h1 className="display-4 text-center first_name">
          Projects
        </h1>
      </div>


      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Version</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody className="labels">
      {loadingData
        ? "Loading..."
        : data.types.map((element) => {
            console.log(element.name);
            return (
                <tr key={element.id}>
                  <>
                    <td>
                      {element.name}

                    </td>
                    <td>
                      {element.version}
                    </td>
                    <td>
                      <Link to={`/projects/${element.id}/requirements`}>
                        <button
                            id={element.id}
                            class="btn btn-primary btn-sm btn-floating mx-2">
                          Open </button>
                      </Link>

                      <button class="btn btn-primary btn-sm btn-floating mx-2"
                          gugugaga={element.id}
                          onClick={() => handleDelete(element.id)}>
                        {loading ? `Deleting...` : `Delete ${element.name}`}
                      </button>
                    </td>
                  </>
                </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  const { access_token } = state;
  return { access_token };
};

export default connect(mapStateToProps, null)(ListTypes);
