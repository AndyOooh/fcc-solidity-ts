import { assert } from 'chai';
// import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import 'hardhat-gas-reporter'; // Move to hardhat.config?
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types';

describe('SimpleStorage', () => {
  let simpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;
  // let simpleStorage: any;

  beforeEach(async () => {
    simpleStorageFactory = (await ethers.getContractFactory(
      'SimpleStorage'
    )) as SimpleStorage__factory;
    simpleStorage = await simpleStorageFactory.deploy();
  });
  it('Should start with a favorite number of 0', async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '0';
    // assert
    // expect
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue)
  });
  it('Should update when we call store', async function () {
    const expectedValue = '7';
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
  it('Shoud add a person of struct People to the people array', async function () {
    const expectedName = 'John';
    const expectedFavoriteNumber = '11';
    const transactionResponse = await simpleStorage.addPerson(expectedName, expectedFavoriteNumber);
    await transactionResponse.wait(1);
    const { name, favoriteNumber } = await simpleStorage.people(0);
    console.log('🚀 ~ file: test-deploy.ts ~ line 39 ~ favoriteNumber', typeof favoriteNumber)
    // assert.lengthOf(simpleStorage.people, 1); // Can't return entire array from auto-getters. This is to prevent high gas costs. INstead create a function that returns the entire array in the contract.
    // assert.equal(name, expectedName);
    // assert.equal(favoriteNumber, expectedFavoriteNumber);

    // const nameToFavoriteNumber = await simpleStorage.nameToFavoriteNumber();
    // console.log('🚀 ~ file: test-deploy.ts ~ line 41 ~ nameToFavoriteNumber', nameToFavoriteNumber)
    // assert.equal(nameToFavoriteNumber, expectedFavoriteNumber);
  });
});
