import { useState } from 'react';
import { IconData } from '../data_functions/iconData';
import useAdminApi from '../../api/Admin_API';
import AlertModal from '../../public/AlertModal';
import ConfirmationModal from '../../public/ConfirmationModal';

const BranchItem = ({ branch, onSelectBranch, onRemoveBranch }) => (
  <div className='relative grid col-span-1 row-span-3 bg-slate-900/25 ml-4 hover:cursor-pointer'>
    <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-sans'
      onClick={() => onSelectBranch(branch.branch_tag, branch.course_tag)}
    >
      {branch.branch_tag}
    </p>

    <div className='justify-self-end self-end hover:bg-red-300'>
      <img src={IconData['Remove']}
        alt='removeIcon'
        width='24px'
        height='24px'
        onClick={() => onRemoveBranch(branch)}
      />
    </div>

    <div className='absolute bottom-[-30px] left-0 top-[105px] text-wrap'>
      <p className='justify-self-start self-end inline-block pl-1'>{branch.course_tag}</p>
      <p>{branch.branch_name}</p>
    </div>
  </div>
);

export default function BranchItems({ branches, onSelectBranch }) {
  const delBranchMutation = useAdminApi().useDelBranchMutation();

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const delBranch = async (branch) => setSelectedBranch(branch);

  const handleConfirmDelete = async () => {
    if (!selectedBranch) return;

    const { branch_tag, branch_name } = selectedBranch;
    try {
      await delBranchMutation.mutateAsync(branch_tag);
    } catch (error) {
      console.log(error.message);
      setIsAlertOpen(true);
      setAlertMessage(`Failed to delete ${branch_tag} ${branch_name}`);
    } finally {
      setSelectedBranch(null);
    }
  };

  return (
    <div className='grid lg:grid-cols-7 sm:grid-cols-2 gap-y-16 mr-4 pb-6'>
      {branches.map((branch) => (
        <BranchItem key={branch.branch_tag}
          branch={branch}
          onSelectBranch={onSelectBranch}
          onRemoveBranch={delBranch}
        />
      ))}
      <ConfirmationModal
        isOpen={!!selectedBranch}
        message={`Delete Branch ${selectedBranch?.branch_tag} ${selectedBranch?.branch_name} ?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setSelectedBranch(null)}
      />
      <AlertModal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} message={alertMessage} />
    </div>
  );
};