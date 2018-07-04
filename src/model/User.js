//
//  BlockV AG. Copyright (c) 2018, all rights reserved.
//
//  Licensed under the BlockV SDK License (the "License"); you may not use this file or
//  the BlockV SDK except in compliance with the License accompanying it. Unless
//  required by applicable law or agreed to in writing, the BlockV SDK distributed under
//  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
//  ANY KIND, either express or implied. See the License for the specific language
//  governing permissions and limitations under the License.
//
export default class User {
  constructor(userData) {
    this.id = userData.user.id;
    this.firstName = userData.user.properties.first_name;
    this.lastName = userData.user.properties.last_name;
    this.avatarUri = userData.user.properties.avatar_uri;
    this.birthday = userData.user.properties.birthday;
    this.language = userData.user.properties.language;
  }
}
