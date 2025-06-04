export const useGetUserOverview = ({
  email,
  userId,
}: {
  email?: string;
  userId?: string;
}) => {
  // Determine which identifier is provided and valid
  const hasValidEmail = !!email; // Check if email is a non-empty string
  const hasValidUserId = !!userId; // Check if userId is a non-empty string

  // --- Logic for selecting the query ---
  let queryToUse = null;
  let variablesToUse: { email?: string; userId?: string } = {};
  let skipQuery = true; // Default to skipping

  if (hasValidEmail && !hasValidUserId) {
    // Only email provided
    queryToUse = GET_USER_OVERVIEW_BY_EMAIL;
    variablesToUse = { email: email! }; // Use '!' because we know it's valid here
    skipQuery = false;
  } else if (!hasValidEmail && hasValidUserId) {
    // Only userId provided
    queryToUse = GET_USER_OVERVIEW_BY_ID;
    variablesToUse = { userId: userId! };
    skipQuery = false;
  } else if (hasValidEmail && hasValidUserId) {
    // Both provided - you need a strategy here.
    // OPTION A (Recommended): Prioritize one (e.g., userId)
    console.warn(
      "Both email and userId provided. Prioritizing userId for lookup."
    );
    queryToUse = GET_USER_OVERVIEW_BY_ID;
    variablesToUse = { userId: userId! };
    skipQuery = false;
    // OPTION B: Default to email if you prefer
    // queryToUse = GET_USER_OVERVIEW_BY_EMAIL;
    // variablesToUse = { email: email! };
    // skipQuery = false;
    // OPTION C: If you want to fetch by email AND by userId and merge/compare results
    // This would require two useQuery calls or more complex logic, which isn't
    // what you're asking for in a single hook. Stick to A or B for simplicity.
  }
  // If neither hasValidEmail nor hasValidUserId, skipQuery remains true.

  const { loading, error, data } = useQuery<UserDataResponse>(
    queryToUse || GET_USER_OVERVIEW_BY_ID, // Provide a fallback query to satisfy TypeScript, but it will be skipped
    {
      variables: variablesToUse,
      skip: skipQuery,
      // Optional: Add fetchPolicy if you want to control caching more
      // fetchPolicy: "network-only"
    }
  );

  return { loading, error, userOverview: data?.users };
};
