import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

//get branches API
const useGetAllBranches = () => {
    const fetchBranches = async () => {
        try {
            const response = await axios.get('/api/branches');
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch branches: ${error.message}`);
            throw new Error('Failed to fetch branches. Please try again later.');
        }
    };

    return useQuery('branchTags', fetchBranches);
};
//get profs API
const useGetProfsByBranchTag = (branch_tag) => {
    return useQuery(
        ['profsData', branch_tag],
        async () => {
            try {
                const response = await axios.get(`/api/profs/${branch_tag}`);
                return response.data;
            } catch (error) {
                throw new Error(`Failed to fetch professors: ${error.message}`);
            }
        }
    );
};
//get courses API
const useGetCoursesByBranchTag = (branch_tag) => {
    return useQuery(
        'courseData',
        async () => {
            const response = await axios.get(`/api/courses/${branch_tag}`);
            return response.data;
        }
    );
};

const useGetProfCoursesByName = (name) => {
    return useQuery(
        'profCoursesData',
        async () => {
            const response = await axios.get(`/profs/myCourse/${name}`);
            return response.data;
        }
    );
};

const useGetAllCourses = () => {
    return useQuery(
        'allCoursesData',
        async () => {
            const response = await axios.get('/profs/allCourse/');
            return response.data;
        }
    );
};
//get groups API
const useGroupByBranch = (branch) => {
    return useQuery(
        ['groupsByBranch', branch],
        async () => {
            const response = await axios.get(`/profs/groupsB/${branch}`);
            return response.data;
        }
    );
};
const useGroupsByBranchYear = (branchYear) => {
    const queryKey = ['groups', branchYear];

    const fetchGroupsByBranchYear = async () => {
        try {
            const response = await axios.get(`/profs/groupsBY/${encodeURIComponent(branchYear)}`);
            const data = response.data.map(group => ({
                ...group,
                prof_names: group.prof_names || [] // Ensure prof_names is an array even if it's null
            }));
            return data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error(`No groups found for the selected branch and year.`);
            } else {
                console.error(`Failed to fetch groups: ${error.message}`);
            }
        }
    };

    return useQuery(queryKey, fetchGroupsByBranchYear);
};
const useAllGroupsByBranch = (branch) => {
    return useQuery(
        ['allGroupsByBranch', branch],
        async () => {
            try {
                const response = await axios.get(`/profs/allGroups/${branch}`);
                return response.data;
            } catch (error) {
                throw new Error(`Failed to fetch groups by branch: ${error.message}`);
            }
        }
    );
};
const useGetLabRoomByBranch = (branch) => {
    return useQuery(
        ['labRooms', branch],
        async () => {
            try {
                const response = await axios.get(`/profs/labRoom/${branch}`);
                return response.data;
            } catch (error) {
                throw new Error(`Failed to fetch lab rooms: ${error.message}`);
            }
        }
    );
};
//groups API
const useAddGroupMutation = () => {
    const queryClient = useQueryClient();

    const addGroup = async (groupData) => {
        try {
            const response = await axios.post('/profs/addGroups', groupData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data.error || 'Failed to add group. Please try again later.');
        }
    };

    return useMutation((groupData) => addGroup(groupData), {
        onSuccess: () => {
            queryClient.invalidateQueries('groups');
        },
    });
};
const useGetGroupsStatusByBranch = (branch) => {
    return useQuery(
        ['groupsStatus', branch],
        async () => {
            const response = await axios.get(`/profs/groupsStatus/${branch}`);
            return response.data;
        }
    );
};

export {
    useAddGroupMutation, useGroupsByBranchYear, useAllGroupsByBranch, useGetAllBranches,
    useGetProfsByBranchTag, useGetAllCourses, useGetCoursesByBranchTag,
    useGetProfCoursesByName, useGroupByBranch, useGetGroupsStatusByBranch,
    useGetLabRoomByBranch
}