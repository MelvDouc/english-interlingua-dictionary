import Button from "$components/Button/Button.jsx";
import api from "$client/utils/api.js";

export default function DeleteEntryButton({ id, onDeleteSuccessful }: {
  id: string;
  onDeleteSuccessful: () => unknown;
}) {
  const handleClick = getClickHandler(id, onDeleteSuccessful);
  return (
    <Button color="danger" title="Delete entry" click={handleClick}>Delete</Button>
  );
}

function getClickHandler(id: string, onDeleteSuccessful: () => unknown) {
  return async () => {
    if (!confirm("Are you sure you want to delete this entry?"))
      return;

    const [deleted] = await api<boolean>(`/entry/${id}`, {
      method: "DELETE"
    });
    if (deleted)
      onDeleteSuccessful();
  };
}