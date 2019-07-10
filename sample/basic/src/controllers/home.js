import { get, post, page, api, authorize } from '../../../../build/controller'

@authorize()
@api('home')
class Home {

  @authorize(false)
  @get('open')
  open(req, res) {
    req.service('yoo')
    res.jsonSuccess('open route')
  }

  @get('closed')
  closed(req, res) {
    res.send('closed route')
  }

}

export default Home