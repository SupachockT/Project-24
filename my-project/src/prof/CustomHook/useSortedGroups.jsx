import { useMemo } from 'react';
import { useGroupsByBranchYear, useAllGroupsByBranch } from '../../api/Profs_API';
import { DAYS_OF_WEEK } from '../data_functions/SchedulerData';

const useSortedGroups = ({ page, currentBranch, currentBranchYear, currentProfName, currentLabRoom }) => {
    const { data: groupsByBranch } = useAllGroupsByBranch(currentBranch) || {};
    const { data: groupsByBranchYear } = useGroupsByBranchYear(currentBranchYear) || {};

    const filterGroupsByPage = (groups) => {
        if (page === 'Prof') {
            return groups.filter(group => Array.isArray(group.prof_names) && group.prof_names.includes(currentProfName));
        }
        if (page === 'Lab') {
            return currentLabRoom === "" ? groups.filter(group => group.lab_room !== "") : groups.filter(group => group.lab_room === currentLabRoom);
        }
        // Default condition: Exclude groups with status 'reject'
        return groups.filter(group => group.group_status !== 'reject');
    };

    const sortGroups = (groups) => groups.sort((a, b) => a.start_time.localeCompare(b.start_time) || a.end_time.localeCompare(b.end_time));

    const sortedGroups = useMemo(() => {
        const groupsToSort = page === 'Lab' ? groupsByBranch : groupsByBranchYear || [];
        const filteredAndSortedGroups = DAYS_OF_WEEK.reduce((acc, day) => {
            const filteredGroups = Array.isArray(groupsToSort) ? filterGroupsByPage(groupsToSort.filter(group => group.day_of_week === day)) : [];
            acc[day] = sortGroups(filteredGroups);
            return acc;
        }, {});
        return filteredAndSortedGroups;
    }, [page, groupsByBranch, groupsByBranchYear, currentProfName, currentLabRoom]);

    return sortedGroups;
};

export default useSortedGroups;