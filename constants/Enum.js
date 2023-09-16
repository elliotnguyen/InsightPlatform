const UserRoleEnum = {
    member: 0,
    lecturer: 1
};

const UserStatusEnum = {
    permSuspended: -2,
    tempSuspended: -1,
    active: 0
};

const DifficultyEnum = {
    remember: 1,
    understand: 2,
    apply: 3,
    analyze: 4,
    evaluate: 5,
    create: 6
};

module.exports = { UserRoleEnum, UserStatusEnum, DifficultyEnum };