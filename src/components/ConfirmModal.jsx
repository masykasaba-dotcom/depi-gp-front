import { useActionState } from "react";


export default function ConfirmModal({ref,onRemove}) {
  async function handleReomveAction(prevState,formData){
    await onRemove()
  }
  const [removeState,removeAction,removePending] = useActionState(handleReomveAction)
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal" ref={ref} >
        <div className="modal-box max-w-md">
          {/* Title */}
          <h3 className="font-bold text-xl flex items-center gap-2">
            Confirm Delete
          </h3>

          {/* Message */}
          <p className="py-4 text-base-content/70">
            Are you sure you want to delete this item?
            <br />
            <span className="text-sm opacity-70">
              This action cannot be undone.
            </span>
          </p>

          {/* Actions */}
          <div className="modal-action flex justify-end gap-3">
            {/* Cancel */}
            <form method="dialog">
              <button className="btn btn-ghost me-2">Cancel</button>
              <button
              formAction={removeAction}
              disabled={removePending}
              className="btn btn-neutral"
              type="submit"
            >
              {removePending ? "Deleting..." : 'Delete'}
            </button>
            </form>

            {/* Confirm */}
            
          </div>
        </div>
      </dialog>
    </>
  );
}
