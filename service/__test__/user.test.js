const UserModel = require('./../../models/user');
const UserService = require('../user');

jest.mock('./../../models/user')

describe('User Test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('User.__insertUser', () => {

    it('should success insert user', async () => {
      const mockInput = {
        name: 'Michael Suharlie',
        username: 'michael',
      }
      jest.spyOn(UserModel.prototype, 'save')
        .mockImplementationOnce(() => true)

      const result = await UserService.insertUser(mockInput)

      expect(result).toEqual(true)
    })
  })

  describe('User.__getUserByUsername', () => {

    it('should success get user by username', async () => {
      const mockUserName = 'michael'
      const mockResponse = {
        name: 'Michael Suharlie',
        username: 'michael',
        status: true
      }

      await UserModel.findOne.mockResolvedValueOnce(mockResponse)

      const result = await UserService.getUserByUsername(mockUserName)

      expect(result).toEqual(mockResponse)
      expect(UserModel.findOne).toHaveBeenCalledTimes(1)
      expect(UserModel.findOne).toHaveBeenCalledWith({ username: mockUserName })
    })

    it('should return null', async () => {
      const mockUserName = 'michael'
      const mockResponse = null

      await UserModel.findOne.mockResolvedValueOnce(mockResponse)

      const result = await UserService.getUserByUsername(mockUserName)

      expect(result).toEqual(mockResponse)
      expect(UserModel.findOne).toHaveBeenCalledTimes(1)
      expect(UserModel.findOne).toHaveBeenCalledWith({ username: mockUserName })
    })
  })

  describe('User.__getUserById', () => {

    it('should success get user by id', async () => {
      const mockId = '63804dbce7153f5ad960f958'
      const mockResponse = {
        name: 'Michael Suharlie',
        username: 'michael',
        status: true
      }

      await UserModel.findById.mockResolvedValueOnce(mockResponse)

      const result = await UserService.getUserById(mockId)

      expect(result).toEqual(mockResponse)
      expect(UserModel.findById).toHaveBeenCalledTimes(1)
      expect(UserModel.findById).toHaveBeenCalledWith(mockId)
    })

    it('should return null', async () => {
      const mockId = '63804dbce7153f5ad960f958'
      const mockResponse = null

      await UserModel.findById.mockResolvedValueOnce(mockResponse)

      const result = await UserService.getUserById(mockId)

      expect(result).toEqual(mockResponse)
      expect(UserModel.findById).toHaveBeenCalledTimes(1)
      expect(UserModel.findById).toHaveBeenCalledWith(mockId)
    })
  })

  describe('User.__deleteUser', () => {

    it('should success delete user', async () => {
      const mockId = '63804dbce7153f5ad960f958'
      const mockResult = true

      await UserModel.findOneAndRemove.mockResolvedValueOnce(mockResult)

      const result = await UserService.deleteUser(mockId)

      expect(result).toEqual(mockResult)
      expect(UserModel.findOneAndRemove).toHaveBeenCalledTimes(1)
      expect(UserModel.findOneAndRemove).toHaveBeenCalledWith({ _id: mockId })
    })
  })

})
