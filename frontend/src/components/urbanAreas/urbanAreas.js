const UrbanAreas = ({ urbanAreas, loading, searched }) => {
  if (loading) {
    return (
      <div className="messageContainer">
        <p>Loading...</p>
      </div>
    );
  }

  if (!searched) {
    return (
      <div className="messageContainer">
        <p>
          Please select a continent from the drop-down menu to view the top 5
          urban areas in that continent based on their Teleport Score.
        </p>
      </div>
    );
  }

  if (urbanAreas.length > 0) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {urbanAreas.map((urbanArea) => (
            <tr key={urbanArea.name}>
              <td>{urbanArea.name}</td>
              <td>{urbanArea.score}</td>
              <td dangerouslySetInnerHTML={{ __html: urbanArea.summary }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default UrbanAreas;
