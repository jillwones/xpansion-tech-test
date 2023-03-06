const UrbanAreas = ({ urbanAreas, loading, searched, error }) => {
  const renderMessage = (message) => (
    <div className="messageContainer">
      <p>{message}</p>
    </div>
  );

  if (error) {
    return renderMessage(error.message);
  }

  if (loading) {
    return renderMessage("Loading...");
  }

  if (!searched) {
    return renderMessage(
      "Please select a continent from the drop-down menu to view the top 5 urban areas in that continent based on their Teleport Score."
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Urban Area Name</th>
          <th>Teleport Score</th>
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
};

export default UrbanAreas;
