"""initial recipes table creation and first attempt at association

Revision ID: dc1e26bb9d74
Revises: 6cf35ce2b034
Create Date: 2021-07-12 18:23:39.476849

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dc1e26bb9d74'
down_revision = '6cf35ce2b034'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipes',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('photo', sa.String(length=255), nullable=False),
                    sa.Column('title', sa.String(length=255), nullable=False),
                    sa.Column('content', sa.Text(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('updated_at', sa.DateTime(), nullable=False),
                    sa.Column('poster_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['poster_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recipes')
    # ### end Alembic commands ###
