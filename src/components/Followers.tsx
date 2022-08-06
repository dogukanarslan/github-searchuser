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
                    <div className="w-25 mx-auto d-flex align-items-center justify-content-between">
                        <img
                            className="rounded-circle"
                            src={follower.avatar_url}
                            width="40"
                            alt="User"
                        />
                        {follower.login}
                    </div>
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}
