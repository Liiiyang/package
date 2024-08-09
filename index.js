/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, arr) => {
  return arr.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !properties.includes(key))
    );
  });
};

exports.excludeByProperty = (properties, arr) => {
  return arr.filter((obj) => !(properties in obj));
};

exports.sumDeep = (arr) => {
  return arr.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        val.reduce(
          (accumulator, currentValue) => accumulator + currentValue.val,
          0
        ),
      ])
    );
  });
};
exports.applyStatusColor = (colors, statusCode) => {
  return statusCode
    .filter((obj) => {
      return Object.values(colors).some((arr) =>
        arr.includes(Object.values(obj)[0])
      );
    })
    .map((obj) => {
      return {
        ...obj,
        color: Object.entries(colors).find(([key, values]) =>
          values.includes(Object.values(obj)[0])
        )[0],
      };
    });
};
exports.createGreeting = (greet, greeting) => {
  return (name) => greet(greeting, name);
};

exports.setDefaults = (defaults) => {
  return (obj) => {
    return { ...defaults, ...obj };
  };
};

exports.fetchUserByNameAndUsersCompany = (user, services) => {
  return new Promise(async (resolve, reject) => {
    const userObj = await (async (name) =>
      (await services.fetchUsers()).find((user) => user.name === name))(user);

    resolve({
      company: await services.fetchCompanyById(userObj.companyId),
      status: await services.fetchStatus(),
      user: userObj,
    });
  });
};
