import { IUser } from 'models'
import { ListGroup, ListGroupItem } from 'reactstrap'

interface FollowersProps {
    followers: IUser[]
}

export const Followers = (props: FollowersProps) => {
    const { followers } = props
    return (
        <ListGroup>
            {followers.map((follower) => (
                <ListGroupItem key={follower.id}>
                    <img
                        className="rounded-circle mr-2"
                        src={follower.avatar_url}
                        width="60"
                        alt="User"
                    />
                    {follower.login}
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}
