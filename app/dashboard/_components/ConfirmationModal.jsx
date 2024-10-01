import React from 'react';
import { Button } from '@/components/ui/button';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this quiz permanently?</p>
        <div className="flex justify-end gap-4">
          <Button 
            onClick={onCancel} 
            className="bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
